import React, {useCallback, useMemo} from 'react';
import Header from '../../../components/layouts/Header';
import {CalendarDate} from '../../../models/Calendar';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import ActiveDateIcon from '../../../components/icons/ActiveDateIcon';
import IconButton from '../../../components/controls/IconButton';

type CalendarViewHeaderProps = {
  date: CalendarDate;
  setDate: (month: CalendarDate) => void;
};

const CalendarViewHeader = ({date, setDate}: CalendarViewHeaderProps) => {
  const isCurrentMonth = useMemo<boolean>(() => {
    return CalendarUtils.isCurrentDate(date);
  }, [date]);

  const goToCurrentDate = useCallback((): void => {
    const currentDate = CalendarUtils.generateCurrentCalendarDate();
    setDate(currentDate);
  }, [setDate]);

  return (
    <Header showAvatar hideGoBack>
      {!isCurrentMonth && <IconButton size="xl" p="2" icon={<ActiveDateIcon />} onPress={goToCurrentDate} />}
    </Header>
  );
};

export default CalendarViewHeader;
