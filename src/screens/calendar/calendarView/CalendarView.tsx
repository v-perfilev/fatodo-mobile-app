import React, {useCallback, useEffect} from 'react';
import CalendarViewHeader from './CalendarViewHeader';
import Animated, {runOnJS, useDerivedValue} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {useIsFocused} from '@react-navigation/native';
import {flowRight} from 'lodash';
import withCalendar from '../../../shared/hocs/withCalendar';
import {useCalendarContext} from '../../../shared/contexts/CalendarContext';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import CalendarViewControl from './calendarViewControl/CalendarViewControl';
import CalendarViewPan from './calendarViewPan/CalendarViewPan';
import CalendarViewContent from './calendarViewContent/CalendarViewContent';

const CalendarView = () => {
  const {monthIndex} = useCalendarContext();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const shouldLoad = useAppSelector(CalendarSelectors.shouldLoad);

  /*
  Effects
   */

  const loadReminders = (monthIndex: number): void => {
    dispatch(CalendarActions.handleMonthThunk(monthIndex));
  };

  useEffect(() => {
    isFocused && shouldLoad && loadReminders(monthIndex.value);
  }, [isFocused, shouldLoad]);

  useDerivedValue(() => {
    runOnJS(loadReminders)(monthIndex.value);
  });

  /*
  Layout
   */

  const control = useCallback((rate: Animated.SharedValue<number>) => {
    return <CalendarViewControl rate={rate} />;
  }, []);

  const content = useCallback((setHeight: (height: number) => void, translate: Animated.SharedValue<number>) => {
    return <CalendarViewContent setHeight={setHeight} translate={translate} />;
  }, []);

  return (
    <>
      <CalendarViewHeader />
      <CalendarViewPan control={control} content={content} />
    </>
  );
};
export default flowRight([withCalendar])(CalendarView);
