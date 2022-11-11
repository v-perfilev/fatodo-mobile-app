import React, {memo, useMemo} from 'react';
import {CalendarDate} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import CalendarViewWeek from '../calendarViewWeek/CalendarViewWeek';
import FBox from '../../../../components/boxes/FBox';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import Separator from '../../../../components/layouts/Separator';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';

type CalendarViewControlWeekProps = {
  weekIndex: number;
  index: number;
  freeze: boolean;
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlWeek = ({weekIndex, index, rate}: CalendarViewControlWeekProps) => {
  const {width} = useWindowDimensions();
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);

  const weekDates = useMemo<CalendarDate[]>(() => {
    return CalendarUtils.generateWeekDates(weekIndex);
  }, []);

  const dates = useMemo<CalendarDate[]>(() => {
    return weekDates.map((date) => {
      const dateMonthIndex = CalendarUtils.getMonthIndexByDate(date);
      date.isCurrentMonth = monthIndex === dateMonthIndex;
      return date;
    });
  }, [monthIndex]);

  const weekStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width * index,
    display: rate.value === 0 ? 'flex' : 'none',
    width,
  }));

  return (
    <Animated.View style={weekStyle}>
      <CalendarViewWeekDays />
      <Separator />
      <FBox my={1}>
        <CalendarViewWeek dates={dates} />
      </FBox>
    </Animated.View>
  );
};

const propsAreEqual = (prevProps: CalendarViewControlWeekProps, nextProps: CalendarViewControlWeekProps): boolean => {
  return nextProps.freeze || (prevProps.weekIndex === nextProps.weekIndex && prevProps.index === nextProps.index);
};

export default memo(CalendarViewControlWeek, propsAreEqual);
