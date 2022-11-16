import React, {memo} from 'react';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import Separator from '../../../../components/layouts/Separator';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';
import CalendarViewControlWeek from './CalendarViewControlWeek';

type CalendarViewControlWeekProps = {
  controlIndex: number;
  weekIndex: number;
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlWeekWithDays = ({controlIndex, weekIndex, rate}: CalendarViewControlWeekProps) => {
  const {width} = useWindowDimensions();

  const weekStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width * controlIndex,
    display: rate.value === 0 ? 'flex' : 'none',
    width,
    height: '100%',
  }));

  return (
    <Animated.View style={weekStyle}>
      <CalendarViewWeekDays />
      <Separator />
      <CalendarViewControlWeek weekIndex={weekIndex} />
    </Animated.View>
  );
};

const propsAreEqual = (prevProps: CalendarViewControlWeekProps, nextProps: CalendarViewControlWeekProps): boolean => {
  return prevProps.weekIndex === nextProps.weekIndex && prevProps.controlIndex === nextProps.controlIndex;
};

export default memo(CalendarViewControlWeekWithDays, propsAreEqual);
