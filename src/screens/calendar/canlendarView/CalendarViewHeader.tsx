import React, {useCallback, useMemo} from 'react';
import Header from '../../../components/layouts/Header';
import IconButton from '../../../components/controls/IconButton';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import ActiveDateIcon from '../../../components/icons/ActiveDateIcon';

type CalendarViewHeaderProps = {
  activeMonth: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
};

const CalendarViewHeader = ({activeMonth, selectMonth}: CalendarViewHeaderProps) => {
  const isCurrentMonth = useMemo<boolean>(() => {
    const currentMonth = CalendarUtils.generateCurrentCalendarMonth();
    return currentMonth.key === activeMonth.key;
  }, [activeMonth]);

  const goToCurrentMonth = useCallback((): void => {
    const currentMonth = CalendarUtils.generateCurrentCalendarMonth();
    selectMonth(currentMonth);
  }, [selectMonth]);

  return (
    <Header showAvatar hideGoBack>
      {!isCurrentMonth && <IconButton size="xl" p="1.5" icon={<ActiveDateIcon />} onPress={goToCurrentMonth} />}
    </Header>
  );
};

export default CalendarViewHeader;
