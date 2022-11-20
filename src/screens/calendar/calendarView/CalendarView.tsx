import React, {useCallback, useEffect, useMemo} from 'react';
import CalendarViewHeader from './CalendarViewHeader';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {useIsFocused} from '@react-navigation/native';
import {flowRight} from 'lodash';
import withCalendar from '../../../shared/hocs/withCalendar';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import CalendarViewControl from './calendarViewControl/CalendarViewControl';
import CalendarViewContent from './calendarViewContent/CalendarViewContent';
import CalendarViewPan from './calendarViewPan/CalendarViewPan';

const CalendarView = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const shouldLoad = useAppSelector(CalendarSelectors.shouldLoad);
  const date = useAppSelector(CalendarSelectors.date);

  /*
  Effects
   */

  const loadReminders = (monthIndex: number): void => {
    dispatch(CalendarActions.handleMonthThunk(monthIndex));
  };

  useEffect(() => {
    isFocused && shouldLoad && loadReminders(date.monthIndex);
  }, [isFocused, shouldLoad]);

  useEffect(() => {
    loadReminders(date.monthIndex);
  }, [date.monthIndex]);

  /*
  Layout
   */

  const control = useMemo(() => <CalendarViewControl />, []);

  const content = useCallback((setHeight: (height: number) => void) => {
    return <CalendarViewContent setHeight={setHeight} />;
  }, []);

  return (
    <>
      <CalendarViewHeader />
      <CalendarViewPan control={control} content={content} />
    </>
  );
};
export default flowRight([withCalendar])(CalendarView);
