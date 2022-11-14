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

const GESTURE_THRESHOLD = 50;

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
      if ((event.translationX > 0 && canScrollLeft) || (event.translationX < 0 && canScrollRight)) {
        translateX.value = context.translateX + event.translationX;
      }
    },
    onEnd: (event) => {
      const finalTranslateX =
        event.translationX > GESTURE_THRESHOLD && canScrollLeft
          ? Math.ceil(translateX.value / width) * width
          : event.translationX < -GESTURE_THRESHOLD && canScrollRight
          ? Math.floor(translateX.value / width) * width
          : Math.round(translateX.value / width) * width;
      translateX.value = withSpring(finalTranslateX, {velocity: event.velocityX, overshootClamping: true});

      const newIndex = Math.abs(Math.round(finalTranslateX / width));
      localIndex.value = newIndex;
      runOnJS(setIndex)(newIndex);
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <PanGestureHandler
      onGestureEvent={panGestureEvent}
      activeOffsetX={[-10, 10]}
      failOffsetY={[-10, 10]}
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