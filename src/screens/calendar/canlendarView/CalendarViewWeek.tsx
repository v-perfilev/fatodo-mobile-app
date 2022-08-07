import React, {Dispatch, SetStateAction} from 'react';
import moment from 'moment';
import CalendarViewDate from './CalendarViewDate';
import FHStack from '../../../components/boxes/FHStack';

type CalendarViewWeekProps = {
  weekDates: moment.Moment[];
  year: number;
  month: number;
  activeDate: moment.Moment;
  selectDate: Dispatch<SetStateAction<moment.Moment>>;
};

const CalendarViewWeek = ({weekDates, year, month, activeDate, selectDate}: CalendarViewWeekProps) => {
  return (
    <FHStack>
      {weekDates.map((date, index) => (
        <CalendarViewDate
          date={date}
          year={year}
          month={month}
          activeDate={activeDate}
          selectDate={selectDate}
          key={index}
        />
      ))}
    </FHStack>
  );
};

export default CalendarViewWeek;
