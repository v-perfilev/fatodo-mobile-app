import React, {useMemo} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import moment from 'moment';
import CalendarViewWeek from './CalendarViewWeek';
import FVStack from '../../../components/boxes/FVStack';

type CalendarViewMonthProps = {
  year: number;
  month: number;
};

const CalendarViewMonth = ({year, month}: CalendarViewMonthProps) => {
  const pageDates = useMemo<moment.Moment[]>(() => CalendarUtils.getOnePageMoments(year, month), [year, month]);
  const weeks = useMemo<moment.Moment[][]>(() => CalendarUtils.splitMonthInWeeks(pageDates), [pageDates]);

  return (
    <FVStack>
      {weeks.map((week, index) => (
        <CalendarViewWeek weekDates={week} year={month} month={month} key={index} />
      ))}
    </FVStack>
  );
};

export default CalendarViewMonth;
