import React, {memo, ReactElement, useMemo, useState} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarDate} from '../../../models/Calendar';
import CalendarViewHeader from './CalendarViewHeader';
import CalendarViewPan from './calendarViewPan/CalendarViewPan';
import Animated from 'react-native-reanimated';
import CalendarViewControl from './CalendarViewControl';
import CalendarViewReminders from './calendarViewReminders/CalendarViewReminders';

const MONTH_NAME_HEIGHT = 40;
const WEEKDAYS_HEIGHT = 40;
const DATE_HEIGHT = 65;
const PADDINGS_HEIGHT = 10;

const CalendarView = () => {
  const [date, setDate] = useState<CalendarDate>(CalendarUtils.generateCurrentCalendarDate());

  const weekCount = useMemo<number>(() => {
    return CalendarUtils.getWeekCountInMonth(date.year, date.month);
  }, [date.year, date.month]);

  const minControlHeight = useMemo<number>(() => {
    return PADDINGS_HEIGHT + MONTH_NAME_HEIGHT + WEEKDAYS_HEIGHT + DATE_HEIGHT;
  }, []);

  const maxControlHeight = useMemo<number>(() => {
    return PADDINGS_HEIGHT + MONTH_NAME_HEIGHT + WEEKDAYS_HEIGHT + DATE_HEIGHT * weekCount;
  }, [weekCount]);

  const control = (rate: Animated.SharedValue<number>): ReactElement => (
    <CalendarViewControl
      monthNameHeight={MONTH_NAME_HEIGHT}
      weekDaysHeight={WEEKDAYS_HEIGHT}
      dateHeight={DATE_HEIGHT}
      {...{rate, date, setDate}}
    />
  );

  const content = <CalendarViewReminders {...{date}} />;

  return (
    <>
      <CalendarViewHeader {...{date, setDate}} />
      <CalendarViewPan {...{control, content, minControlHeight, maxControlHeight}} />
    </>
  );
};
export default memo(CalendarView);
