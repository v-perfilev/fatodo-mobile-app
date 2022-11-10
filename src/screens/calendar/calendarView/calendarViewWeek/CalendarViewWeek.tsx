import React, {memo, useCallback, useMemo} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {CalendarDate, CalendarWeek} from '../../../../models/Calendar';
import CalendarViewDate from './CalendarViewWeekDate';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import FBox from '../../../../components/boxes/FBox';

type CalendarViewWeekProps = {
  rate: Animated.SharedValue<number>;
  week: CalendarWeek;
};

const CalendarViewWeek = ({rate, week}: CalendarViewWeekProps) => {
  const {date, setDate, weekIndex} = useCalendarContext();

  const isActiveWeek = useMemo<boolean>(() => {
    const currentWeekIndex = CalendarUtils.getWeekIndexByDate(week[0]);
    return weekIndex === currentWeekIndex;
  }, [weekIndex]);

  const isActiveDate = useCallback(
    (weekDate: CalendarDate) => {
      return weekDate.date === date.date;
    },
    [date.date],
  );

  const style = useAnimatedStyle(() => ({
    width: '100%',
    height: isActiveWeek ? CALENDAR_DATE_HEIGHT : CALENDAR_DATE_HEIGHT * rate.value,
    maxHeight: CALENDAR_DATE_HEIGHT,
    opacity: isActiveWeek ? 1 : rate.value,
    overflow: 'hidden',
  }));

  return (
    <Animated.View style={style}>
      <FBox flexDirection="row" px={1}>
        {week.map((weekDate, index) => (
          <CalendarViewDate date={weekDate} isActiveDate={isActiveDate(weekDate)} setActiveDate={setDate} key={index} />
        ))}
      </FBox>
    </Animated.View>
  );
};

export default memo(CalendarViewWeek);
