import React, {useCallback, useMemo} from 'react';
import Header from '../../../components/layouts/Header';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import ActiveDateIcon from '../../../components/icons/ActiveDateIcon';
import IconButton from '../../../components/controls/IconButton';

type CalendarViewHeaderProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
};

const CalendarViewHeader = ({month, selectMonth}: CalendarViewHeaderProps) => {
  const isCurrentMonth = useMemo<boolean>(() => {
    const currentMonth = CalendarUtils.generateCurrentCalendarMonth();
    return currentMonth.key === month.key;
  }, [month]);

  const goToCurrentMonth = useCallback((): void => {
    const currentMonth = CalendarUtils.generateCurrentCalendarMonth();
    selectMonth(currentMonth);
  }, [selectMonth]);

  return (
    <Header showAvatar hideGoBack>
      {!isCurrentMonth && <IconButton size="xl" p="2" icon={<ActiveDateIcon />} onPress={goToCurrentMonth} />}
    </Header>
  );
};

export default CalendarViewHeader;
