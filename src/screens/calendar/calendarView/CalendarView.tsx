import React, {ReactElement, useCallback, useEffect, useMemo} from 'react';
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
import withCalendarContext from '../../../shared/hocs/withCalendarContext';
import {useCalendarContext} from '../../../shared/contexts/CalendarContext';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';

const CalendarView = () => {
  const {date} = useCalendarContext();

  const weekCount = useMemo<number>(() => {
    return CalendarUtils.getWeekCountInMonth(date);
  }, [date.year, date.month]);

  useEffect(() => {
    console.log(weekCount);
  }, [weekCount]);

  const minControlHeight = useMemo<number>(() => {
    return CALENDAR_MARGIN_HEIGHT + CALENDAR_TITLE_HEIGHT + CALENDAR_WEEKDAYS_HEIGHT + CALENDAR_DATE_HEIGHT;
  }, []);

  const maxControlHeight = useMemo<number>(() => {
    return CALENDAR_MARGIN_HEIGHT + CALENDAR_TITLE_HEIGHT + CALENDAR_WEEKDAYS_HEIGHT + CALENDAR_DATE_HEIGHT * weekCount;
  }, [weekCount]);

  const control = useCallback((rate: Animated.SharedValue<number>) => <CalendarViewControl rate={rate} />, []);

  const content = useMemo<ReactElement>(() => <CalendarViewReminders />, []);

  return (
    <>
      <CalendarViewHeader />
      <CalendarViewPan
        control={control}
        content={content}
        minControlHeight={minControlHeight}
        maxControlHeight={maxControlHeight}
      />
    </>
  );
};
export default withCalendarContext(CalendarView);
