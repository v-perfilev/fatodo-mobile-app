import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import moment from 'moment';
import CalendarViewWeek from './CalendarViewWeek';
import FVStack from '../../../components/boxes/FVStack';
import {CalendarMonth} from '../../../models/Calendar';

type CalendarViewMonthProps = {
  month: CalendarMonth;
  activeDate: moment.Moment;
  selectDate: Dispatch<SetStateAction<moment.Moment>>;
};

const CalendarViewMonth = ({month, activeDate, selectDate}: CalendarViewMonthProps) => {
  const pageDates = useMemo<moment.Moment[]>(() => CalendarUtils.getOnePageMoments(month.year, month.month), [month]);
  const weeks = useMemo<moment.Moment[][]>(() => CalendarUtils.splitMonthInWeeks(pageDates), [pageDates]);

  return (
    <FVStack>
      {weeks.map((week, index) => (
        <CalendarViewWeek month={month} weekDates={week} activeDate={activeDate} selectDate={selectDate} key={index} />
      ))}
    </FVStack>
  );
};

export default CalendarViewMonth;
