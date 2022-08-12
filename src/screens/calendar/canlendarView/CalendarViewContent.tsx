import React, {Dispatch, memo, SetStateAction} from 'react';
import {Divider} from 'native-base';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewMonthName from './CalendarViewMonthName';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import CalendarViewMonth from './CalendarViewMonth';
import CalendarViewReminders from './calendarViewReminders/CalendarViewReminders';
import {CalendarDate, CalendarItem, CalendarMonth} from '../../../models/Calendar';

type CalendarViewContentProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
  activeDate: CalendarDate;
  setActiveDate: Dispatch<SetStateAction<CalendarDate>>;
};

const CalendarViewContent = ({month, selectMonth, activeDate, setActiveDate}: CalendarViewContentProps) => {
  return (
    <FVStack flex="1" flexGrow="1" space="2" py="2">
      <CalendarViewMonthName month={month} selectMonth={selectMonth} />
      <Divider />
      <FVStack space="2">
        <CalendarViewWeekDays />
        <CalendarViewMonth month={month} activeDate={activeDate} selectDate={setActiveDate} />
      </FVStack>
      <Divider />
      <CalendarViewReminders month={month} activeDate={activeDate} />
    </FVStack>
  );
};

export default memo(CalendarViewContent);
