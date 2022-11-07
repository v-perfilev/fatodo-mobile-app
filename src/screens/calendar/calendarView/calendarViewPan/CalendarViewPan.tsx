import React, {ReactElement, useState} from 'react';
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
  const [containerHeight, setContainerHeight] = useState<number>(initialContainerHeight);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const handleLayout = (e: LayoutChangeEvent): void => {
    const height = e.nativeEvent.layout.height;
    setContainerHeight(height);
  };

  const controlHeight = useSharedValue(maxControlHeight);
  const contentTranslation = useSharedValue(0);

  /*
  CONTROL VALUES
   */

  const clampedControlHeight = useDerivedValue(() => {
    return Math.min(Math.max(controlHeight.value, minControlHeight), maxControlHeight);
  });

  const clampedControlRate = useDerivedValue(() => {
    const possibleDiff = maxControlHeight - minControlHeight;
    const currentDiff = controlHeight.value - minControlHeight;
    const rate = currentDiff / possibleDiff;
    return Math.min(Math.max(rate, 0), 1);
  });

  /*
  CONTENT VALUES
   */

  const clampedContentTranslation = useDerivedValue(() => {
    const canScroll = contentHeight + minControlHeight > containerHeight;
    const maxTranslation = containerHeight - minControlHeight - contentHeight;
    return canScroll ? Math.max(Math.min(contentTranslation.value, 0), maxTranslation) : 0;
  });

  const clampedContentHeight = useDerivedValue(() => {
    return containerHeight - Math.min(Math.max(controlHeight.value, minControlHeight), maxControlHeight);
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
        controlHeight.value = withSpring(finalControlHeight, {velocity: event.velocityY, overshootClamping: true});
      } else {
        contentTranslation.value = withDecay({velocity: event.velocityY});
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={styles.container} onLayout={handleLayout}>
        <CalendarViewPanControl rate={clampedControlRate} {...{control}} />
        <CalendarViewPanContent
          height={clampedContentHeight}
          translate={clampedContentTranslation}
          {...{content, setContentHeight}}
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

export default CalendarViewPan;
