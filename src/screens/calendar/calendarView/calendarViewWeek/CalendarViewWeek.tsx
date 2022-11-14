import React, {memo} from 'react';
import {CalendarDate} from '../../../../models/Calendar';
import CalendarViewDate from './CalendarViewWeekDate';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import FBox from '../../../../components/boxes/FBox';

type CalendarViewWeekProps = {
  dates: CalendarDate[];
  freeze: boolean;
};

const CalendarViewWeek = ({dates}: CalendarViewWeekProps) => {
  return (
    <FBox flexDirection="row" width="100%" height={CALENDAR_DATE_HEIGHT} px={1} overflow="hidden">
      {dates.map((date) => (
        <CalendarViewDate date={date} key={`date_${date.month}_${date.date}`} />
      ))}
    </FBox>
  );
};

const propsAreEqual = (prevProps: CalendarViewWeekProps, nextProps: CalendarViewWeekProps): boolean => {
  if (nextProps.freeze) {
    return true;
  } else {
    return JSON.stringify(prevProps.dates) === JSON.stringify(nextProps.dates);
  }
};

export default memo(CalendarViewWeek, propsAreEqual);
