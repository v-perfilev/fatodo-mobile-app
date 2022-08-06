import React, {useMemo} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import moment from 'moment';
import CalendarViewWeek from './CalendarViewWeek';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import CalendarViewMonthName from './CalendarViewMonthName';
import {Divider} from 'native-base';

type CalendarViewMonthProps = {
  year: number;
  month: number;
};

const CalendarViewMonth = ({year, month}: CalendarViewMonthProps) => {
  const pageDates = useMemo<moment.Moment[]>(() => CalendarUtils.getOnePageMoments(year, month), [year, month]);
  const weeks = useMemo<moment.Moment[][]>(() => CalendarUtils.splitMonthInWeeks(pageDates), [pageDates]);

  return (
    <FVStack space="2" py="2">
      <CalendarViewMonthName year={year} month={month} />
      <Divider />
      <CalendarViewWeekDays />
      <FVStack>
        {weeks.map((week, index) => (
          <CalendarViewWeek weekDates={week} month={month} key={index} />
        ))}
      </FVStack>
      <Divider />
    </FVStack>
  );
};

export default CalendarViewMonth;
