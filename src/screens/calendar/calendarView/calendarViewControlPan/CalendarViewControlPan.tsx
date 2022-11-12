import React, {memo, ReactElement, useEffect} from 'react';
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

type CalendarViewControlPanProps = {
  list: ReactElement;
  index: number;
  setIndex: (index: number) => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
};

type PanContext = {
  translateX: number;
};

const GESTURE_THRESHOLD = 50;

const CalendarViewControlPan = ({
  list,
  index,
  setIndex,
  canScrollLeft,
  canScrollRight,
}: CalendarViewControlPanProps) => {
  const {width} = useWindowDimensions();

  const localIndex = useSharedValue(index);
  const translateX = useSharedValue(-width * index);

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
    onFail: (event) => {
      const finalTranslateX = Math.round(translateX.value / width) * width;
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
      localIndex.value = index;
    }
  }, [index]);

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={[styles.container, style]}>
        <FHStack width={Number.MAX_VALUE} height="100%">
          {list}
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