import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import React, {Dispatch, memo, ReactElement, SetStateAction} from 'react';
import {LayoutChangeEvent} from 'react-native';

type CalendarViewPanContentProps = {
  content: ReactElement;
  height: Animated.SharedValue<number>;
  translate: Animated.SharedValue<number>;
  setContentHeight: Dispatch<SetStateAction<number>>;
};

const CalendarViewPanContent = ({content, height, translate, setContentHeight}: CalendarViewPanContentProps) => {
  const handleLayout = (e: LayoutChangeEvent): void => {
    const height = e.nativeEvent.layout.height;
    setContentHeight(height);
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
