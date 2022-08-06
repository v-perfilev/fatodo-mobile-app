import React from 'react';
import Header from '../../../components/layouts/Header';
import CalendarViewContainer from './CalendarViewContainer';

const CalendarView = () => {
  return (
    <>
      <Header hideGoBack />
      <CalendarViewContainer month={7} year={2022} />
    </>
  );
};

export default CalendarView;
