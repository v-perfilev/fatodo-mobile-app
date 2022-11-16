import React, {memo, PropsWithChildren, Ref} from 'react';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {StyleSheet, useWindowDimensions} from 'react-native';
import FHStack from '../../../../components/boxes/FHStack';

type CalendarViewHorizontalPanProps = PropsWithChildren<{
  index: Animated.SharedValue<number>;
  setIndex: (index: number) => void;
  canScrollLeft: Animated.SharedValue<boolean>;
  canScrollRight: Animated.SharedValue<boolean>;
  horizontalPanRef: Ref<PanGestureHandler>;
}>;

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
  horizontalPanRef,
  children,
}: CalendarViewHorizontalPanProps) => {
  const {width} = useWindowDimensions();

  const localIndex = useSharedValue(index.value);
  const translateX = useSharedValue(-width * index.value);

  /*
  Effects
   */

  useAnimatedReaction(
    () => index.value,
    (next, prev) => {
      if (prev && next !== prev && next !== localIndex.value) {
        const animate = Math.abs(next - prev) < 5;
        const newTranslateX = -next * width;
        translateX.value = animate ? withTiming(newTranslateX, {duration: 400}) : newTranslateX;
        localIndex.value = next;
      }
    },
  );

  /*
  Gesture handlers
   */

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, PanContext>({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      const [shouldTranslate] = calcActiveParams(event.translationX, canScrollLeft.value, canScrollRight.value);
      if (shouldTranslate) {
        translateX.value = context.translateX + event.translationX;
      }
    },
    onEnd: (event) => {
      const [finalTranslateX, index] = calcEndParams(
        event.translationX,
        translateX.value,
        width,
        canScrollLeft.value,
        canScrollRight.value,
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

export default memo(CalendarViewHorizontalPan);
