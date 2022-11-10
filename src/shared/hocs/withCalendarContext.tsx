import React, {ComponentType, memo, useCallback, useMemo, useState} from 'react';
import {flowRight} from 'lodash';
import {CalendarDate} from '../../models/Calendar';
import {CalendarUtils} from '../utils/CalendarUtils';
import {CalendarContext} from '../contexts/CalendarContext';

type CalendarParams = {
  date: CalendarDate;
  monthIndex: number;
  weekIndex: number;
};

const initialCalendarParams: CalendarParams = {
  date: CalendarUtils.getCurrentDate(),
  monthIndex: CalendarUtils.getMonthIndexByDate(CalendarUtils.getCurrentDate()),
  weekIndex: CalendarUtils.getWeekIndexByDate(CalendarUtils.getCurrentDate()),
};

const withCalendarContext = (Component: ComponentType) => (props: any) => {
  const [params, setParams] = useState<CalendarParams>(initialCalendarParams);

  const setDate = useCallback((date: CalendarDate): void => {
    const monthIndex = CalendarUtils.getMonthIndexByDate(date);
    const weekIndex = CalendarUtils.getWeekIndexByDate(date);
    setParams({date, monthIndex, weekIndex});
  }, []);

  const setMonthIndex = useCallback((monthIndex: number): void => {
    const date = CalendarUtils.generateFirstMonthDate(monthIndex);
    const weekIndex = CalendarUtils.getWeekIndexByDate(date);
    setParams({date, monthIndex, weekIndex});
  }, []);

  const setWeekIndex = useCallback((weekIndex: number): void => {
    const date = CalendarUtils.generateFirstWeekDate(weekIndex);
    const monthIndex = CalendarUtils.getMonthIndexByDate(date);
    setParams({date, monthIndex, weekIndex});
  }, []);

  const value = useMemo(
    () => ({
      date: params.date,
      monthIndex: params.monthIndex,
      weekIndex: params.weekIndex,
      setDate,
      setMonthIndex,
      setWeekIndex,
    }),
    [params],
  );

  return (
    <CalendarContext.Provider value={value}>
      <Component {...props} />
    </CalendarContext.Provider>
  );
};

export default flowRight([memo, withCalendarContext]);
