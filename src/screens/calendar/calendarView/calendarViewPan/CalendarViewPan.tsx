import React, {memo, ReactElement, useCallback, useMemo, useState} from 'react';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import CalendarViewPanControl from './CalendarViewPanControl';
import {LayoutChangeEvent, StatusBar, StyleSheet, useWindowDimensions} from 'react-native';
import {HEADER_HEIGHT, TAB_HEIGHT} from '../../../../constants';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import CalendarViewPanContent from './CalendarViewPanContent';

type CalendarViewPanProps = {
  control: (rate: Animated.SharedValue<number>) => ReactElement;
  content: (setHeight: (height: number) => void, translate: Animated.SharedValue<number>) => ReactElement;
};

type PanContext = {
  controlHeight: number;
  contentTranslateY: number;
  prevContentTranslationY: number;
};

const GESTURE_THRESHOLD = 30;
const BASE_HEIGHT = StatusBar.currentHeight + HEADER_HEIGHT + TAB_HEIGHT;

const calcActiveParams = (
  translationY: number,
  prevTranslationY: number,
  controlHeight: number,
  minControlHeight: number,
  maxControlHeight: number,
): [boolean] => {
  'worklet';
  const isMinControlHeight = controlHeight === minControlHeight;
  const isMaxControlHeight = controlHeight === maxControlHeight;
  const isScrollDown = translationY - prevTranslationY > 0;
  const shouldTranslate = (isMaxControlHeight && isScrollDown) || (isMinControlHeight && !isScrollDown);
  return [shouldTranslate];
};

const calcEndParams = (
  translationY: number,
  controlHeight: number,
  minControlHeight: number,
  maxControlHeight: number,
): [boolean, number, number, number] => {
  'worklet';
  const middleContentHeight = (maxControlHeight - minControlHeight) / 2 + minControlHeight;
  const shouldChangeHeight = controlHeight !== minControlHeight && controlHeight !== maxControlHeight;
  const finalHeight =
    translationY > GESTURE_THRESHOLD
      ? maxControlHeight
      : translationY < -GESTURE_THRESHOLD
      ? minControlHeight
      : controlHeight > middleContentHeight
      ? maxControlHeight
      : minControlHeight;
  const finalRate = finalHeight === maxControlHeight ? 1 : 0;
  const heightDiff = maxControlHeight - minControlHeight;
  return [shouldChangeHeight, finalHeight, finalRate, heightDiff];
};

const clamp = (value: number, min: number, max: number): number => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

const CalendarViewPan = ({control, content}: CalendarViewPanProps) => {
  const {controlPanRef, contentPanRef, minControlHeight, maxControlHeight} = useCalendarContext();
  const {height} = useWindowDimensions();
  const [containerHeightState, setContainerHeightState] = useState<number>(height - BASE_HEIGHT);
  const [contentHeightState, setContentHeightState] = useState<number>(0);

  const controlHeight = useSharedValue<number>(maxControlHeight.value);
  const contentTranslate = useSharedValue<number>(0);
  const rate = useSharedValue<number>(1);

  const contentHeightThreshold = useMemo<number>(
    () => containerHeightState - minControlHeight.value,
    [contentHeightState],
  );

  const handleLayout = useCallback((e: LayoutChangeEvent): void => {
    const height = e.nativeEvent.layout.height;
    setContainerHeightState(height);
  }, []);

  const handleContentHeightChange = useCallback((height: number): void => {
    contentTranslate.value = 0;
    setContentHeightState(height);
  }, []);

  /*
  Derived values
   */

  const contentHeight = useDerivedValue(() => {
    return containerHeightState - controlHeight.value;
  });

  const clampedRate = useDerivedValue(() => {
    return clamp(rate.value, 0, 1);
  });

  const clampedContentTranslate = useDerivedValue(() => {
    const canScroll = contentHeightState + minControlHeight.value > containerHeightState;
    const maxTranslate = containerHeightState - minControlHeight.value - contentHeightState;
    return canScroll ? clamp(contentTranslate.value, 0, maxTranslate) : 0;
  });

  /*
  Effects
   */

  useAnimatedReaction(
    () => maxControlHeight.value,
    (next, prev) => {
      if (next !== prev && controlHeight.value !== minControlHeight.value) {
        cancelAnimation(controlHeight);
        controlHeight.value = withTiming(next, {duration: 200});
      }
    },
  );

  /*
  GESTURE HANDLER
   */

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, PanContext>({
    onStart: (_, context) => {
      context.controlHeight = controlHeight.value;
      context.contentTranslateY = clampedContentTranslate.value;
      context.prevContentTranslationY = 0;
      cancelAnimation(contentTranslate);
    },
    onActive: (event, context) => {
      const [shouldTranslate] = calcActiveParams(
        event.translationY,
        context.prevContentTranslationY,
        controlHeight.value,
        minControlHeight.value,
        maxControlHeight.value,
      );
      if (shouldTranslate) {
        contentTranslate.value = event.translationY + context.contentTranslateY;
        context.controlHeight = controlHeight.value - event.translationY;
      } else {
        controlHeight.value = clamp(
          event.translationY + context.controlHeight,
          minControlHeight.value,
          maxControlHeight.value,
        );
        rate.value = (controlHeight.value - minControlHeight.value) / (maxControlHeight.value - minControlHeight.value);
        context.contentTranslateY = clampedContentTranslate.value - event.translationY;
      }
      context.prevContentTranslationY = event.translationY;
    },
    onEnd: (event) => {
      const [shouldChangeControlHeight, finalControlHeight, finalRate, heightDiff] = calcEndParams(
        event.translationY,
        controlHeight.value,
        minControlHeight.value,
        maxControlHeight.value,
      );
      if (shouldChangeControlHeight) {
        controlHeight.value = withSpring(finalControlHeight, {velocity: event.velocityY, overshootClamping: true});
        rate.value = withSpring(finalRate, {velocity: event.velocityY / heightDiff, overshootClamping: true});
      } else {
        contentTranslate.value = withDecay({velocity: event.velocityY});
      }
    },
  });

  return (
    <PanGestureHandler
      onGestureEvent={panGestureEvent}
      failOffsetX={[-5, 5]}
      activeOffsetY={[-5, 5]}
      waitFor={[controlPanRef, contentPanRef]}
    >
      <Animated.View style={styles.container} onLayout={handleLayout}>
        <CalendarViewPanControl height={controlHeight} rate={clampedRate} control={control} />
        <CalendarViewPanContent
          content={content}
          contentHeightThreshold={contentHeightThreshold}
          setContentHeight={handleContentHeightChange}
          height={contentHeight}
          translate={clampedContentTranslate}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(CalendarViewPan);
