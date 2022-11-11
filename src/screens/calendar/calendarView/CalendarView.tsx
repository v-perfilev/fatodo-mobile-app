import React, {ReactElement, useCallback, useMemo} from 'react';
import CalendarViewHeader from './CalendarViewHeader';
import CalendarViewPan from './calendarViewPan/CalendarViewPan';
import Animated from 'react-native-reanimated';
import CalendarViewReminders from './calendarViewReminders/CalendarViewReminders';
import {
  CALENDAR_DATE_HEIGHT,
  CALENDAR_MARGIN_HEIGHT,
  CALENDAR_TITLE_HEIGHT,
  CALENDAR_WEEKDAYS_HEIGHT,
} from '../../../constants';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import CalendarViewControl from './calendarViewControl/CalendarViewControl';

const CalendarView = () => {
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);

  const weekCount = useMemo<number>(() => {
    return CalendarUtils.getWeekCountInMonth(monthIndex);
  }, [monthIndex]);

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
export default CalendarView;
