import React, {memo} from 'react';
import Header from '../../../components/layouts/Header';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import ActiveDateIcon from '../../../components/icons/ActiveDateIcon';
import IconButton from '../../../components/controls/IconButton';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';

const CalendarViewHeader = () => {
  const dispatch = useAppDispatch();
  const dateIndex = useAppSelector(CalendarSelectors.dateIndex);

  const date = CalendarUtils.getDateByDateIndex(dateIndex);
  const isCurrentDate = CalendarUtils.isCurrentDate(date);

  const goToCurrentDate = (): void => {
    const currentDate = CalendarUtils.getCurrentDate();
    dispatch(CalendarActions.setDate(currentDate));
  };

  return (
    <Header showAvatar hideGoBack>
      {!isCurrentDate && <IconButton size="xl" p="2" icon={<ActiveDateIcon />} onPress={goToCurrentDate} />}
    </Header>
  );
};

export default memo(CalendarViewHeader);
