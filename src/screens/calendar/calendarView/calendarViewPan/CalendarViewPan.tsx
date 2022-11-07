import React, {useState} from 'react';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
} from 'react-native-reanimated';
import CalendarViewPanContent from './CalendarViewPanContent';
import CalendarViewPanControl from './CalendarViewPanControl';
import {LayoutChangeEvent, StyleSheet} from 'react-native';

type CalendarViewPanProps = {
  minControlHeight: number;
  maxControlHeight: number;
};

type PanContext = {
  controlHeight: number;
  contentTranslation: number;
  prevTranslation: number;
};

const GESTURE_THRESHOLD = 50;

const CalendarViewPan = ({minControlHeight, maxControlHeight}: CalendarViewPanProps) => {
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const handleLayout = (e: LayoutChangeEvent): void => {
    const height = e.nativeEvent.layout.height;
    setContainerHeight(height);
  };

  /*
  CONTROL HEIGHT
   */

  const controlHeight = useSharedValue(maxControlHeight);
  const clampedControlHeight = useDerivedValue(() => {
    return Math.min(Math.max(controlHeight.value, minControlHeight), maxControlHeight);
  });

  /*
  CONTENT TRANSLATION
   */

  const contentTranslation = useSharedValue(0);
  const clampedContentTranslation = useDerivedValue(() => {
    const maxTranslation = containerHeight - minControlHeight - contentHeight;
    return Math.max(Math.min(contentTranslation.value, 0), maxTranslation);
  });

  /*
  GESTURE HANDLER
   */

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, PanContext>({
    onStart: (_, context) => {
      context.controlHeight = clampedControlHeight.value;
      context.contentTranslation = clampedContentTranslation.value;
      context.prevTranslation = 0;
      cancelAnimation(contentTranslation);
    },
    onActive: (event, context) => {
      const isMinControlHeight = clampedControlHeight.value === minControlHeight;
      const isMaxControlHeight = clampedControlHeight.value === maxControlHeight;
      const isScrollDown = event.translationY - context.prevTranslation > 0;

      context.prevTranslation = event.translationY;

      if ((isMaxControlHeight && isScrollDown) || (isMinControlHeight && !isScrollDown)) {
        context.controlHeight = clampedControlHeight.value - event.translationY;
        contentTranslation.value = event.translationY + context.contentTranslation;
      } else {
        context.contentTranslation = clampedContentTranslation.value - event.translationY;
        controlHeight.value = event.translationY + context.controlHeight;
      }
    },
    onEnd: (event) => {
      const middleContentHeight = (maxControlHeight - minControlHeight) / 2 + minControlHeight;
      const shouldChangeControlHeight =
        clampedControlHeight.value !== minControlHeight && clampedControlHeight.value !== maxControlHeight;

      const finalControlHeight =
        event.translationY > GESTURE_THRESHOLD
          ? maxControlHeight
          : event.translationY < -GESTURE_THRESHOLD
          ? minControlHeight
          : clampedControlHeight.value > middleContentHeight
          ? maxControlHeight
          : minControlHeight;

      if (shouldChangeControlHeight) {
        controlHeight.value = withSpring(finalControlHeight, {velocity: event.velocityY, damping: 100});
      } else {
        contentTranslation.value = withDecay({velocity: event.velocityY});
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={styles.container} onLayout={handleLayout}>
        <CalendarViewPanControl height={clampedControlHeight} />
        <CalendarViewPanContent translateY={clampedContentTranslation} setContentHeight={setContentHeight} />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CalendarViewPan;
