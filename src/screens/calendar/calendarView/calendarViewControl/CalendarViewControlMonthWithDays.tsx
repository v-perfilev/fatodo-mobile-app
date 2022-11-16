import React, {memo} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import Separator from '../../../../components/layouts/Separator';
import {useWindowDimensions} from 'react-native';
import CalendarViewControlMonth from './CalendarViewControlMonth';

type CalendarViewControlMonthWithDaysProps = {
  controlIndex: number;
  monthIndex: number;
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlMonthWithDays = ({controlIndex, monthIndex, rate}: CalendarViewControlMonthWithDaysProps) => {
  const {width} = useWindowDimensions();

  const monthStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width * controlIndex,
    display: rate.value === 0 ? 'none' : 'flex',
    width,
  }));

  return (
    <Animated.View style={monthStyle}>
      <CalendarViewWeekDays />
      <Separator />
      <CalendarViewControlMonth monthIndex={monthIndex} rate={rate} />
    </Animated.View>
  );
};

const propsAreEqual = (
  prevProps: CalendarViewControlMonthWithDaysProps,
  nextProps: CalendarViewControlMonthWithDaysProps,
): boolean => {
  return prevProps.monthIndex === nextProps.monthIndex && prevProps.controlIndex === nextProps.controlIndex;
};

export default memo(CalendarViewControlMonthWithDays, propsAreEqual);
