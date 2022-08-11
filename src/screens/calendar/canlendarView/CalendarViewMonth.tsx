import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarDate, CalendarMonth} from '../../../models/Calendar';
import FHStack from '../../../components/boxes/FHStack';
import CalendarViewDate from './CalendarViewDate';
import {Dimensions} from 'react-native';
import {Box} from 'native-base';

type CalendarViewMonthProps = {
  month: CalendarMonth;
  activeDate: CalendarDate;
  selectDate: Dispatch<SetStateAction<CalendarDate>>;
};

const CalendarViewMonth = ({month, activeDate, selectDate}: CalendarViewMonthProps) => {
  const pageDates = useMemo<CalendarDate[]>(() => CalendarUtils.getOnePageDates(month.year, month.month), [month]);
  const width = (Dimensions.get('window').width - 6) / 7;

  return (
    <FHStack mx="3px" flexWrap="wrap">
      {pageDates.map((date, index) => (
        <Box w={width} key={index}>
          <CalendarViewDate date={date} month={month} activeDate={activeDate} selectDate={selectDate} />
        </Box>
      ))}
    </FHStack>
  );
};

export default CalendarViewMonth;
