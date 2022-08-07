import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {CalendarThunks} from '../../../store/calendar/calendarActions';
import moment from 'moment';
import {Divider} from 'native-base';
import FScrollView from '../../../components/boxes/FScrollView';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewMonthName from './CalendarViewMonthName';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import CalendarViewMonth from './CalendarViewMonth';
import CalendarViewReminders from './calendarViewReminders/CalendarViewReminders';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';

type CalendarViewContainerProps = {
  year: number;
  month: number;
};

const CalendarViewContainer = ({year, month}: CalendarViewContainerProps) => {
  const dispatch = useAppDispatch();
  const monthKey = CalendarUtils.buildMonthKey(year, month);
  const hasReminders = useAppSelector((state) => CalendarSelectors.hasReminders(state, monthKey));
  const [date, setDate] = useState<moment.Moment>();

  const refresh = async (): Promise<void> => {
    await dispatch(CalendarThunks.fetchReminders({year, month}));
  };

  useEffect(() => {
    !hasReminders && dispatch(CalendarThunks.fetchReminders({year, month}));
  }, []);

  return (
    <FScrollView p="0" refresh={refresh}>
      <FVStack flex="1" flexGrow="1" space="2" py="2">
        <CalendarViewMonthName year={year} month={month} />
        <Divider />
        <FVStack mx="1" space="2">
          <CalendarViewWeekDays />
          <CalendarViewMonth year={year} month={month} activeDate={date} selectDate={setDate} />
        </FVStack>
        <Divider />
        <CalendarViewReminders year={year} month={month} date={date} />
      </FVStack>
    </FScrollView>
  );
};

export default CalendarViewContainer;
