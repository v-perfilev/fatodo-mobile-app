import React, {memo, ReactElement, useEffect} from 'react';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {CALENDAR_SCROLL_INDENT} from '../../../../constants';
import FHStack from '../../../../components/boxes/FHStack';

type CalendarViewControlPanProps = {
  control: ReactElement;
  index: number;
  setIndex: (index: number) => void;
  length: number;
};

type PanContext = {
  translateX: number;
};

const GESTURE_THRESHOLD = 50;

const CalendarViewControlPan = ({control, index, setIndex, length}: CalendarViewControlPanProps) => {
  const {width} = useWindowDimensions();

  const localIndex = useSharedValue(index);
  const translateX = useSharedValue(-width * index);

  const clampedTranslateX = useDerivedValue(() => {
    const maxTranslateX = -width * (length - 1);
    return Math.max(Math.min(translateX.value, 0), maxTranslateX);
  });

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, PanContext>({
    onStart: (_, context) => {
      context.translateX = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
    },
    onEnd: (event) => {
      const finalTranslateX =
        event.translationX > GESTURE_THRESHOLD
          ? Math.ceil(clampedTranslateX.value / width) * width
          : event.translationX < -GESTURE_THRESHOLD
          ? Math.floor(clampedTranslateX.value / width) * width
          : Math.round(clampedTranslateX.value / width) * width;
      translateX.value = withSpring(finalTranslateX, {velocity: event.velocityX, overshootClamping: true});

      const newIndex = Math.abs(Math.round(finalTranslateX / width));
      localIndex.value = newIndex;
      runOnJS(setIndex)(newIndex);
    },
    onFail: (event) => {
      const finalTranslateX = Math.round(clampedTranslateX.value / width) * width;
      translateX.value = withSpring(finalTranslateX, {velocity: event.velocityX, overshootClamping: true});

      const newIndex = Math.abs(Math.round(finalTranslateX / width));
      if (newIndex !== localIndex.value) {
        localIndex.value = newIndex;
        runOnJS(setIndex)(newIndex);
      }
    },
  });

  useEffect(() => {
    if (index !== localIndex.value) {
      const shouldAnimateScroll = Math.abs(index - localIndex.value) < CALENDAR_SCROLL_INDENT;
      const newTranslateX = -index * width;
      translateX.value = shouldAnimateScroll ? withTiming(newTranslateX, {duration: 200}) : newTranslateX;
    }
  }, [index]);

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: clampedTranslateX.value}],
  }));

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent} activeOffsetX={[-5, 5]} activeOffsetY={[-5, 5]}>
      <Animated.View style={[styles.container, style]}>
        <FHStack width={width * length} height="100%">
          {control}
        </FHStack>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(CalendarViewControlPan);
