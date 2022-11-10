import React, {memo, ReactElement, useEffect, useState} from 'react';
import {PanGestureHandler, PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import CalendarViewPanContent from './CalendarViewPanContent';
import CalendarViewPanControl from './CalendarViewPanControl';
import {LayoutChangeEvent, StatusBar, StyleSheet, useWindowDimensions} from 'react-native';
import {HEADER_HEIGHT, TAB_HEIGHT} from '../../../../constants';

type CalendarViewPanProps = {
  control: (rate: Animated.SharedValue<number>) => ReactElement;
  content: ReactElement;
  minControlHeight: number;
  maxControlHeight: number;
};

type PanContext = {
  controlHeight: number;
  contentTranslation: number;
  prevTranslation: number;
};

const GESTURE_THRESHOLD = 50;

const CalendarViewPan = ({control, content, minControlHeight, maxControlHeight}: CalendarViewPanProps) => {
  const {height} = useWindowDimensions();
  const initialContainerHeight = height - StatusBar.currentHeight - HEADER_HEIGHT - TAB_HEIGHT;
  const [containerHeightState, setContainerHeightState] = useState<number>(initialContainerHeight);
  const [contentHeightState, setContentHeightState] = useState<number>(0);

  const handleLayout = (e: LayoutChangeEvent): void => {
    const height = e.nativeEvent.layout.height;
    setContainerHeightState(height);
  };

  const rate = useSharedValue(1);
  const controlHeight = useSharedValue(maxControlHeight);
  const contentTranslation = useSharedValue(0);

  /*
  DERIVED VALUES
   */

  const contentHeight = useDerivedValue(() => {
    return containerHeightState - controlHeight.value;
  });

  const clampedRate = useDerivedValue(() => {
    return Math.min(Math.max(rate.value, 0), 1);
  });

  const clampedContentTranslation = useDerivedValue(() => {
    const canScroll = contentHeightState + minControlHeight > containerHeightState;
    const maxTranslation = containerHeightState - minControlHeight - contentHeightState;
    return canScroll ? Math.max(Math.min(contentTranslation.value, 0), maxTranslation) : 0;
  });

  /*
  GESTURE HANDLER
   */

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, PanContext>({
    onStart: (_, context) => {
      context.controlHeight = controlHeight.value;
      context.contentTranslation = clampedContentTranslation.value;
      context.prevTranslation = 0;
      cancelAnimation(contentTranslation);
    },
    onActive: (event, context) => {
      const isMinControlHeight = controlHeight.value === minControlHeight;
      const isMaxControlHeight = controlHeight.value === maxControlHeight;
      const isScrollDown = event.translationY - context.prevTranslation > 0;

      context.prevTranslation = event.translationY;

      if ((isMaxControlHeight && isScrollDown) || (isMinControlHeight && !isScrollDown)) {
        context.controlHeight = controlHeight.value - event.translationY;
        contentTranslation.value = event.translationY + context.contentTranslation;
      } else {
        context.contentTranslation = clampedContentTranslation.value - event.translationY;
        controlHeight.value = event.translationY + context.controlHeight;
        rate.value = (controlHeight.value - minControlHeight) / (maxControlHeight - minControlHeight);
      }
    },
    onEnd: (event) => {
      const middleContentHeight = (maxControlHeight - minControlHeight) / 2 + minControlHeight;
      const shouldChangeControlHeight =
        controlHeight.value !== minControlHeight && controlHeight.value !== maxControlHeight;

      const finalControlHeight =
        event.translationY > GESTURE_THRESHOLD
          ? maxControlHeight
          : event.translationY < -GESTURE_THRESHOLD
          ? minControlHeight
          : controlHeight.value > middleContentHeight
          ? maxControlHeight
          : minControlHeight;
      const finalRate = finalControlHeight === maxControlHeight ? 1 : 0;

      if (shouldChangeControlHeight) {
        controlHeight.value = withSpring(finalControlHeight, {velocity: event.velocityY, overshootClamping: true});
        rate.value = withSpring(finalRate, {velocity: event.velocityY, overshootClamping: true});
      } else {
        contentTranslation.value = withDecay({velocity: event.velocityY});
      }
    },
    onFail: (event) => {
      const middleContentHeight = (maxControlHeight - minControlHeight) / 2 + minControlHeight;
      const finalControlHeight = controlHeight.value > middleContentHeight ? maxControlHeight : minControlHeight;
      const finalRate = finalControlHeight === maxControlHeight ? 1 : 0;
      controlHeight.value = withSpring(finalControlHeight, {velocity: event.velocityY, overshootClamping: true});
      rate.value = withSpring(finalRate, {velocity: event.velocityY, overshootClamping: true});
    },
  });

  useEffect(() => {
    if (controlHeight.value !== minControlHeight) {
      controlHeight.value = withTiming(maxControlHeight, {duration: 300});
    }
  }, [maxControlHeight]);

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={styles.container} onLayout={handleLayout}>
        <CalendarViewPanControl height={controlHeight} rate={clampedRate} control={control} />
        <CalendarViewPanContent
          height={contentHeight}
          translate={clampedContentTranslation}
          content={content}
          setContentHeight={setContentHeightState}
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
