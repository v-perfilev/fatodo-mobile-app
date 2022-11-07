import React, {ReactElement} from 'react';
import Animated from 'react-native-reanimated';

type CalendarViewPanControlProps = {
  control: (rate: Animated.SharedValue<number>) => ReactElement;
  rate: Animated.SharedValue<number>;
};

const CalendarViewPanControl = ({control, rate}: CalendarViewPanControlProps) => {
  return <>{control(rate)}</>;
};

export default CalendarViewPanControl;
