import React, {memo, PropsWithChildren, Ref, useCallback, useImperativeHandle} from 'react';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {CALENDAR_SCROLL_INDENT} from '../../../../constants';
import FHStack from '../../../../components/boxes/FHStack';

type CalendarViewHorizontalPanProps = PropsWithChildren<{
  index: number;
  setIndex: (index: number) => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  imperativePanRef?: Ref<CalendarViewHorizontalPanMethods>;
  horizontalPanRef?: Ref<PanGestureHandler>;
}>;

export type CalendarViewHorizontalPanMethods = {
  scrollToIndex: (index: number) => void;
};

type PanContext = {
  translateX: number;
};

const GESTURE_THRESHOLD = 10;

const calcActiveParams = (translationX: number, canScrollLeft: boolean, canScrollRight: boolean): [boolean] => {
  'worklet';
  const shouldTranslate = (translationX > 0 && canScrollLeft) || (translationX < 0 && canScrollRight);
  return [shouldTranslate];
};

const calcEndParams = (
  translationX: number,
  translateX: number,
  width: number,
  canScrollLeft: boolean,
  canScrollRight: boolean,
): [number, number] => {
  'worklet';
  const finalTranslateX =
    translationX > GESTURE_THRESHOLD && canScrollLeft
      ? Math.ceil(translateX / width) * width
      : translationX < -GESTURE_THRESHOLD && canScrollRight
      ? Math.floor(translateX / width) * width
      : Math.round(translateX / width) * width;
  const index = Math.abs(Math.round(finalTranslateX / width));
  return [finalTranslateX, index];
};

const CalendarViewHorizontalPan = ({
  index,
  setIndex,
  canScrollLeft,
  canScrollRight,
  imperativePanRef,
  horizontalPanRef,
  children,
}: CalendarViewHorizontalPanProps) => {
  const {width} = useWindowDimensions();

  const localIndex = useSharedValue(index);
  const translateX = useSharedValue(-width * index);

  /*
  Imperative handlers
   */

  const scrollToIndex = useCallback((index: number): void => {
    const shouldAnimateScroll = Math.abs(index - localIndex.value) < CALENDAR_SCROLL_INDENT;
    const newTranslateX = -index * width;
    translateX.value = shouldAnimateScroll ? withTiming(newTranslateX, {duration: 200}) : newTranslateX;
    localIndex.value = index;
  }, []);

  useImperativeHandle(imperativePanRef, (): CalendarViewHorizontalPanMethods => ({scrollToIndex}), [scrollToIndex]);

  /*
  Gesture handlers
   */

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, PanContext>({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      const [shouldTranslate] = calcActiveParams(event.translationX, canScrollLeft, canScrollRight);
      if (shouldTranslate) {
        translateX.value = context.translateX + event.translationX;
      }
    },
    onEnd: (event) => {
      const [finalTranslateX, index] = calcEndParams(
        event.translationX,
        translateX.value,
        width,
        canScrollLeft,
        canScrollRight,
      );
      translateX.value = withSpring(finalTranslateX, {velocity: event.velocityX, overshootClamping: true});
      localIndex.value = index;
      runOnJS(setIndex)(index);
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <PanGestureHandler
      onGestureEvent={panGestureEvent}
      activeOffsetX={[-5, 5]}
      failOffsetY={[-5, 5]}
      ref={horizontalPanRef}
    >
      <Animated.View style={[styles.container, style]}>
        <FHStack width={Number.MAX_VALUE} height="100%">
          {children}
        </FHStack>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
});

const propsAreEqual = (
  prevProps: CalendarViewHorizontalPanProps,
  nextProps: CalendarViewHorizontalPanProps,
): boolean => {
  return (
    prevProps.index === nextProps.index &&
    prevProps.setIndex === nextProps.setIndex &&
    prevProps.canScrollLeft === nextProps.canScrollLeft &&
    prevProps.canScrollRight === nextProps.canScrollRight
  );
};

export default memo(CalendarViewHorizontalPan, propsAreEqual);
