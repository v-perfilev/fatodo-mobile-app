import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import React, {memo, ReactElement, useCallback, useRef} from 'react';
import AnimatedBox from '../../../../components/animated/AnimatedBox';

type CalendarViewPanContentProps = {
  content: (setHeight: (height: number) => void) => ReactElement;
  contentHeightThreshold: number;
  setContentHeight: (height: number) => void;
  height: Animated.SharedValue<number>;
};

const CalendarViewPanContent = ({
  content,
  setContentHeight,
  contentHeightThreshold,
  height,
}: CalendarViewPanContentProps) => {
  const prevHeight = useRef<number>(0);

  const setHeight = useCallback(
    (height: number): void => {
      const roundedHeight = Math.round(height);
      const roundedThreshold = Math.round(contentHeightThreshold);

      const heightChanged = height !== prevHeight.current;
      const shouldUpdateMoreThanThreshold = roundedHeight > roundedThreshold;
      const shouldUpdateLessThanThreshold = roundedHeight <= roundedThreshold && prevHeight.current > roundedThreshold;

      if (heightChanged && (shouldUpdateMoreThanThreshold || shouldUpdateLessThanThreshold)) {
        setContentHeight(height);
      }

      prevHeight.current = roundedHeight;
    },
    [contentHeightThreshold],
  );

  const style = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <AnimatedBox style={style} overflow="hidden">
      {content(setHeight)}
    </AnimatedBox>
  );
};

export default memo(CalendarViewPanContent);
