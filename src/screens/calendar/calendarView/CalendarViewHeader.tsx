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
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const dateIndex = useAppSelector(CalendarSelectors.dateIndex);

  const isCurrentDate = useMemo<boolean>(() => {
    const date = CalendarUtils.getCalendarDate(monthIndex, dateIndex);
    return CalendarUtils.isCurrentDate(date);
  }, [monthIndex, dateIndex]);

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
