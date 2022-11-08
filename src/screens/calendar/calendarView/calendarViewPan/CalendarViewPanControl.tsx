import React, {ReactElement} from 'react';
import Animated from 'react-native-reanimated';

type CalendarViewPanControlProps = {
  control: (height: Animated.SharedValue<number>, rate: Animated.SharedValue<number>) => ReactElement;
  height: Animated.SharedValue<number>;
  rate: Animated.SharedValue<number>;
};

const CalendarViewPanControl = ({control, height, rate}: CalendarViewPanControlProps) => {
  return <>{control(height, rate)}</>;
};

export default CalendarViewPanControl;
