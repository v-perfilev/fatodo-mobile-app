import React, {memo, ReactElement} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import AnimatedBox from '../../../../components/animated/AnimatedBox';

type CalendarViewPanControlProps = {
  control: ReactElement;
  height: Animated.SharedValue<number>;
};

const CalendarViewPanControl = ({control, height}: CalendarViewPanControlProps) => {
  const style = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <AnimatedBox style={style} overflow="hidden">
      {control}
    </AnimatedBox>
  );
};

export default memo(CalendarViewPanControl);
