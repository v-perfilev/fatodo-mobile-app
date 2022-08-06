import React from 'react';
import moment from 'moment';
import CalendarViewDate from './CalendarViewDate';
import FHStack from '../../../components/boxes/FHStack';

type CalendarViewWeekProps = {
  weekDates: moment.Moment[];
  year: number;
  month: number;
};

const CalendarViewWeek = ({weekDates, year, month}: CalendarViewWeekProps) => {
  return (
    <FHStack>
      {weekDates.map((date, index) => (
        <CalendarViewDate date={date} year={year} month={month} key={index} />
      ))}
    </FHStack>
  );
};

export default CalendarViewWeek;
