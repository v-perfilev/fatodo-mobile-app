import React, {ReactElement} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

type CalendarViewPanControlProps = {
  control: (rate: Animated.SharedValue<number>) => ReactElement;
  height: Animated.SharedValue<number>;
  rate: Animated.SharedValue<number>;
};

const CalendarViewPanControl = ({control, height, rate}: CalendarViewPanControlProps) => {
  const style = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden',
  }));

  return <Animated.View style={style}>{control(rate)}</Animated.View>;
};

export default CalendarViewPanControl;
