import React, {memo} from 'react';
import {CalendarEnrichedDate} from '../../../../models/Calendar';
import CalendarViewDate from './CalendarViewWeekDate';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import FBox from '../../../../components/boxes/FBox';

type CalendarViewWeekProps = {
  dates: CalendarEnrichedDate[];
  activeMonthIndex?: number;
};

const CalendarViewWeek = ({dates, activeMonthIndex}: CalendarViewWeekProps) => {
  return (
    <FBox flexDirection="row" width="100%" height={CALENDAR_DATE_HEIGHT} px={1} overflow="hidden">
      {dates.map((date) => (
        <CalendarViewDate date={date} activeMonthIndex={activeMonthIndex} key={`date_${date.month}_${date.date}`} />
      ))}
    </FBox>
  );
};

const propsAreEqual = (prevProps: CalendarViewWeekProps, nextProps: CalendarViewWeekProps): boolean => {
  return JSON.stringify(prevProps.dates) === JSON.stringify(nextProps.dates);
};

export default memo(CalendarViewWeek, propsAreEqual);
