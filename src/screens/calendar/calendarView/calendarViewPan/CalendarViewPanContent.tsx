import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import React, {Dispatch, memo, ReactElement, SetStateAction, useRef} from 'react';
import {LayoutChangeEvent} from 'react-native';

type CalendarViewPanContentProps = {
  content: ReactElement;
  contentHeightThreshold: number;
  setContentHeight: Dispatch<SetStateAction<number>>;
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

  const handleLayout = (e: LayoutChangeEvent): void => {
    const height = e.nativeEvent.layout.height;
    const roundedHeight = Math.round(height);
    const roundedThreshold = Math.round(contentHeightThreshold);

    const heightChanged = height !== prevHeight.current;
    const shouldUpdateMoreThanThreshold = roundedHeight > roundedThreshold;
    const shouldUpdateLessThanThreshold = roundedHeight <= roundedThreshold && prevHeight.current > roundedThreshold;

    if (heightChanged && (shouldUpdateMoreThanThreshold || shouldUpdateLessThanThreshold)) {
      console.log(roundedHeight, roundedThreshold);
      setContentHeight(height);
    }

    prevHeight.current = roundedHeight;
  };

  const outerStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden',
  }));

  const innerStyle = useAnimatedStyle(() => ({
    minHeight: height.value,
    transform: [{translateY: translate.value}],
  }));

  return (
    <Animated.View style={outerStyle}>
      <Animated.View style={innerStyle} onLayout={handleLayout}>
        {content}
      </Animated.View>
    </Animated.View>
  );
};

export default memo(CalendarViewPanContent);
