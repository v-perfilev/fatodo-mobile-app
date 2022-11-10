import React, {memo, useCallback, useMemo} from 'react';
import Header from '../../../components/layouts/Header';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import ActiveDateIcon from '../../../components/icons/ActiveDateIcon';
import IconButton from '../../../components/controls/IconButton';
import {useCalendarContext} from '../../../shared/contexts/CalendarContext';

const CalendarViewHeader = () => {
  const {date, setDate} = useCalendarContext();

  const isCurrentMonth = useMemo<boolean>(() => {
    return CalendarUtils.isCurrentDate(date);
  }, [date]);

  const goToCurrentDate = useCallback((): void => {
    const currentDate = CalendarUtils.getCurrentDate();
    setDate(currentDate);
  }, []);

  return (
    <Header showAvatar hideGoBack>
      {!isCurrentMonth && <IconButton size="xl" p="2" icon={<ActiveDateIcon />} onPress={goToCurrentDate} />}
    </Header>
  );
};

export default memo(CalendarViewHeader);
