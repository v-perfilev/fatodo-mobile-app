import React, {Dispatch, SetStateAction} from 'react';
import moment from 'moment';
import CalendarViewDate from './CalendarViewDate';
import FHStack from '../../../components/boxes/FHStack';
import {CalendarMonth} from '../../../models/Calendar';

type CalendarViewWeekProps = {
  month: CalendarMonth;
  weekDates: moment.Moment[];
  activeDate: moment.Moment;
  selectDate: Dispatch<SetStateAction<moment.Moment>>;
};

const CalendarViewWeek = ({month, weekDates, activeDate, selectDate}: CalendarViewWeekProps) => {
  return (
    <FHStack>
      {weekDates.map((date, index) => (
        <CalendarViewDate date={date} month={month} activeDate={activeDate} selectDate={selectDate} key={index} />
      ))}
    </FHStack>
  );
};

export default CalendarViewWeek;
