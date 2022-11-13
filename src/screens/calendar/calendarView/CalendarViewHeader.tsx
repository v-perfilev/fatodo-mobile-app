import React, {memo, useCallback, useMemo} from 'react';
import Header from '../../../components/layouts/Header';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import ActiveDateIcon from '../../../components/icons/ActiveDateIcon';
import IconButton from '../../../components/controls/IconButton';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';

const CalendarViewHeader = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(CalendarSelectors.date);

  const isCurrentDate = useMemo<boolean>(() => {
    return CalendarUtils.isCurrentDate(date);
  }, [date]);

  const goToCurrentDate = useCallback((): void => {
    const currentDate = CalendarUtils.getCurrentDate();
    dispatch(CalendarActions.selectDate(currentDate));
  }, []);

  return (
    <Header showAvatar hideGoBack>
      {!isCurrentDate && <IconButton size="xl" p="2" icon={<ActiveDateIcon />} onPress={goToCurrentDate} />}
    </Header>
  );
};

export default memo(CalendarViewHeader);
