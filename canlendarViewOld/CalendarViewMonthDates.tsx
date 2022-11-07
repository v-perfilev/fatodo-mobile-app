import React, {Dispatch, memo, SetStateAction, useCallback, useMemo} from 'react';
import {CalendarUtils} from '../src/shared/utils/CalendarUtils';
import {CalendarDate, CalendarMonth} from '../src/models/Calendar';
import FHStack from '../src/components/boxes/FHStack';
import CalendarViewDate from './CalendarViewDate';
import {Box} from 'native-base';

type CalendarViewMonthDatesProps = {
  month: CalendarMonth;
  activeDate: CalendarDate;
  selectDate: Dispatch<SetStateAction<CalendarDate>>;
  width: number;
};

const CalendarViewMonthDates = ({month, activeDate, selectDate, width}: CalendarViewMonthDatesProps) => {
  const pageDates = useMemo<CalendarDate[]>(() => CalendarUtils.getOnePageDates(month.year, month.month), [month]);

  const isActiveDate = useCallback((date: CalendarDate) => date.date === activeDate?.date, [activeDate]);

  const dateWidth = (width - 6) / 7;

  return (
    <FHStack mx="3px" flexWrap="wrap">
      {pageDates.map((date, index) => (
        <Box w={dateWidth} key={index}>
          <CalendarViewDate month={month} date={date} selectDate={selectDate} isActiveDate={isActiveDate(date)} />
        </Box>
      ))}
    </FHStack>
  );
};

export default memo(CalendarViewMonthDates);
