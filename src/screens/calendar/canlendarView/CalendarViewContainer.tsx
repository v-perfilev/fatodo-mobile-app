import React, {memo, useEffect, useState} from 'react';
import {useAppDispatch} from '../../../store/store';
import {CalendarThunks} from '../../../store/calendar/calendarActions';
import moment from 'moment';
import {Divider} from 'native-base';
import FScrollView from '../../../components/boxes/FScrollView';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewMonthName from './CalendarViewMonthName';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import CalendarViewMonth from './CalendarViewMonth';
import CalendarViewReminders from './calendarViewReminders/CalendarViewReminders';
import {CalendarItem, CalendarRoute} from '../../../models/Calendar';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';

type CalendarViewContainerProps = {
  month: CalendarRoute;
  selectMonth: (month: CalendarItem) => void;
  isActive: boolean;
};

const CalendarViewContainer = ({month, selectMonth, isActive}: CalendarViewContainerProps) => {
  const dispatch = useAppDispatch();
  const [activeDate, setActiveDate] = useState<moment.Moment>();

  const refresh = async (): Promise<void> => {
    await dispatch(CalendarThunks.fetchReminders([month.key]));
  };

  useEffect(() => {
    const date = CalendarUtils.getNowMoment();
    const isCurrentMonth = date.month() === month.month && date.year() === month.year;
    const shouldCurrentMonthUpdate = isCurrentMonth && activeDate?.date() !== date.date();
    const shouldAnotherMonthUpdate = !isCurrentMonth && activeDate;
    if (shouldCurrentMonthUpdate || shouldAnotherMonthUpdate) {
      setActiveDate(isCurrentMonth ? date : undefined);
    }
  }, [isActive]);

  return (
    <FScrollView p="0" refresh={refresh}>
      <FVStack flex="1" flexGrow="1" space="2" py="2">
        <CalendarViewMonthName month={month} selectMonth={selectMonth} />
        <Divider />
        <FVStack mx="1" space="2">
          <CalendarViewWeekDays />
          <CalendarViewMonth month={month} activeDate={activeDate} selectDate={setActiveDate} />
        </FVStack>
        <Divider />
        <CalendarViewReminders month={month} date={activeDate} />
      </FVStack>
    </FScrollView>
  );
};

function isEqual(prevProps: CalendarViewContainerProps, nextProps: CalendarViewContainerProps): boolean {
  return prevProps.isActive === nextProps.isActive;
}

export default memo(CalendarViewContainer, isEqual);
