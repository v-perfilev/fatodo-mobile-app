import React, {useCallback, useMemo} from 'react';
import Header from '../src/components/layouts/Header';
import {CalendarItem, CalendarMonth} from '../src/models/Calendar';
import {CalendarUtils} from '../src/shared/utils/CalendarUtils';
import ActiveDateIcon from '../src/components/icons/ActiveDateIcon';
import IconButton from '../src/components/controls/IconButton';

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
      {!isCurrentMonth && <IconButton size="xl" p="2" icon={<ActiveDateIcon />} onPress={goToCurrentMonth} />}
    </Header>
  );
};

export default CalendarViewHeader;
