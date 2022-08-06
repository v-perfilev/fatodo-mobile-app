import React from 'react';
import Header from '../../../components/layouts/Header';
import CalendarViewMonth from './CalendarViewMonth';
import CalendarViewWeekDays from './CalendarViewWeekDays';

const CalendarView = () => {
  return (
    <>
      <Header hideGoBack />
      <CalendarViewMonth month={7} year={2022} />
    </>
  );
};

export default CalendarView;
