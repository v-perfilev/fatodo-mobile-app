import React, {useEffect} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import CalendarViewMonthName from './CalendarViewMonthName';
import {Divider} from 'native-base';
import {useAppDispatch} from '../../../store/store';
import {CalendarThunks} from '../../../store/calendar/calendarActions';
import RefreshableView from '../../../components/surfaces/RefreshableView';
import CalendarViewMonth from './CalendarViewMonth';

type CalendarViewContainerProps = {
  year: number;
  month: number;
};

const CalendarViewContainer = ({year, month}: CalendarViewContainerProps) => {
  const dispatch = useAppDispatch();

  const refresh = async (): Promise<void> => {
    await dispatch(CalendarThunks.fetchReminders({year, month}));
  };

  useEffect(() => {
    dispatch(CalendarThunks.fetchReminders({year, month}));
  }, [year, month]);

  return (
    <RefreshableView refresh={refresh}>
      <FVStack space="2" py="2">
        <CalendarViewMonthName year={year} month={month} />
        <Divider />
        <CalendarViewWeekDays />
        <CalendarViewMonth year={year} month={month} />
        <Divider />
      </FVStack>
    </RefreshableView>
  );
};

export default CalendarViewContainer;
