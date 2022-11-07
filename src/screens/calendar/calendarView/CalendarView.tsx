import React, {memo, useRef, useState} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarMonth} from '../../../models/Calendar';
import {Dimensions} from 'react-native';
import CalendarViewHeader from './CalendarViewHeader';
import CalendarViewMonthName from './CalendarViewMonthName';
import FVStack from '../../../components/boxes/FVStack';
import Separator from '../../../components/layouts/Separator';
import CalendarViewPan from './calendarViewPan/CalendarViewPan';

const width = Dimensions.get('window').width;
const months = CalendarUtils.generateAllCalendarMonths();
const monthKeys = months.map((r) => r.key);
const getInitialMonth = (): CalendarMonth => CalendarUtils.generateCurrentCalendarMonth();
const getInitialIndex = (month: CalendarMonth): number => monthKeys.indexOf(month.key);

const CalendarView = () => {
  const initialMonth = useRef<CalendarMonth>(getInitialMonth());
  const [activeMonth] = useState<CalendarMonth>(initialMonth.current);

  return (
    <>
      <CalendarViewHeader month={activeMonth} selectMonth={console.log} />
      <FVStack smallSpace grow>
        <CalendarViewMonthName month={activeMonth} selectMonth={console.log} />
        <Separator />
        <CalendarViewPan minControlHeight={50} maxControlHeight={500} />
      </FVStack>
    </>
  );
};
export default memo(CalendarView);
