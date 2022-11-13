import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import React, {memo, ReactElement, useCallback, useRef} from 'react';

type CalendarViewPanContentProps = {
  content: (setHeight: (height: number) => void, translate: Animated.SharedValue<number>) => ReactElement;
  contentHeightThreshold: number;
  setContentHeight: (height: number) => void;
  height: Animated.SharedValue<number>;
  translate: Animated.SharedValue<number>;
};

const CalendarViewPanContent = ({
  content,
  setContentHeight,
  contentHeightThreshold,
  height,
  translate,
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

  const outerStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden',
  }));

  return <Animated.View style={outerStyle}>{content(setHeight, translate)}</Animated.View>;
};

export default memo(CalendarViewPanContent);
