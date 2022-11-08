import React, {memo, ReactElement, useMemo, useState} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarDate} from '../../../models/Calendar';
import CalendarViewHeader from './CalendarViewHeader';
import CalendarViewPan from './calendarViewPan/CalendarViewPan';
import Animated from 'react-native-reanimated';
import CalendarViewControl from './CalendarViewControl';
import CalendarViewReminders from './calendarViewReminders/CalendarViewReminders';
import {
  CALENDAR_DATE_HEIGHT,
  CALENDAR_MARGIN_HEIGHT,
  CALENDAR_TITLE_HEIGHT,
  CALENDAR_WEEKDAYS_HEIGHT,
} from '../../../constants';

const CalendarView = () => {
  const [date, setDate] = useState<CalendarDate>(CalendarUtils.generateCurrentCalendarDate());

  const weekCount = useMemo<number>(() => {
    return CalendarUtils.getWeekCountInMonth(date.year, date.month);
  }, [date.year, date.month]);

  const minControlHeight = useMemo<number>(() => {
    return CALENDAR_MARGIN_HEIGHT + CALENDAR_TITLE_HEIGHT + CALENDAR_WEEKDAYS_HEIGHT + CALENDAR_DATE_HEIGHT;
  }, []);

  const maxControlHeight = useMemo<number>(() => {
    return CALENDAR_MARGIN_HEIGHT + CALENDAR_TITLE_HEIGHT + CALENDAR_WEEKDAYS_HEIGHT + CALENDAR_DATE_HEIGHT * weekCount;
  }, [weekCount]);

  const control = (height: Animated.SharedValue<number>, rate: Animated.SharedValue<number>): ReactElement => (
    <CalendarViewControl height={height} rate={rate} date={date} setDate={setDate} />
  );

  const content = <CalendarViewReminders date={date} />;

  return (
    <>
      <CalendarViewHeader date={date} setDate={setDate} />
      <CalendarViewPan
        control={control}
        content={content}
        minControlHeight={minControlHeight}
        maxControlHeight={maxControlHeight}
      />
    </>
  );
};
export default memo(CalendarView);
