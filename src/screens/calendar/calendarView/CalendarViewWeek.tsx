import React, {Dispatch, SetStateAction, useCallback, useMemo} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {CalendarDate, CalendarWeek} from '../../../models/Calendar';
import FHStack from '../../../components/boxes/FHStack';
import CalendarViewDate from './CalendarViewDate';
import {CALENDAR_DATE_HEIGHT} from '../../../constants';

type CalendarViewWeekProps = {
  rate: Animated.SharedValue<number>;
  week: CalendarWeek;
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
};

const CalendarViewWeek = ({rate, week, date, setDate}: CalendarViewWeekProps) => {
  const isActiveWeek = useMemo<boolean>(() => {
    return week
      .filter((d) => d.isCurrentMonth)
      .map((d) => d.date)
      .includes(date.date);
  }, [date]);

  const isActiveDate = useCallback(
    (weekDate: CalendarDate) => {
      return weekDate.date === date.date;
    },
    [date.date],
  );

  const style = useAnimatedStyle(() => ({
    height: isActiveWeek ? CALENDAR_DATE_HEIGHT : CALENDAR_DATE_HEIGHT * rate.value,
    maxHeight: CALENDAR_DATE_HEIGHT,
    opacity: isActiveWeek ? 1 : rate.value,
    overflow: 'hidden',
  }));

  return (
    <Animated.View style={style}>
      <FHStack grow px={1}>
        {week.map((weekDate, index) => (
          <CalendarViewDate date={weekDate} isActiveDate={isActiveDate(weekDate)} setActiveDate={setDate} key={index} />
        ))}
      </FHStack>
    </Animated.View>
  );
};

export default CalendarViewWeek;
