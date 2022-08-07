import React from 'react';
import Header from '../../../components/layouts/Header';
import CalendarViewContainer from './CalendarViewContainer';

const CalendarView = () => {
  return (
    <>
      <Header hideGoBack />
      <CalendarViewContainer year={2022} month={7} />
    </>
  );
};

export default CalendarView;
