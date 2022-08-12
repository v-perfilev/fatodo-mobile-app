import React, {memo, useMemo} from 'react';
import {useAppSelector} from '../../../store/store';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import CalendarViewContent from './CalendarViewContent';
import FBox from '../../../components/boxes/FBox';

type CalendarViewContainerProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
  width: number;
};

const CalendarViewContainer = ({month, selectMonth, width}: CalendarViewContainerProps) => {
  const activeMonth = useAppSelector(CalendarSelectors.activeMonth);

  const isActiveMonth = useMemo<boolean>(() => {
    return month.key === activeMonth?.key;
  }, [activeMonth]);

  return (
    <FBox width={width}>
      <CalendarViewContent month={month} selectMonth={selectMonth} isActiveMonth={isActiveMonth} />
    </FBox>
  );
};

export default memo(CalendarViewContainer);
