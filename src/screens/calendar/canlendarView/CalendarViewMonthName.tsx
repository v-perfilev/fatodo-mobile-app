import React from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import {Text} from 'native-base';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import FBox from '../../../components/boxes/FBox';

type CalendarViewMonthNameProps = {
  year: number;
  month: number;
};

const CalendarViewMonthName = ({year, month}: CalendarViewMonthNameProps) => {
  const monthMoment = CalendarUtils.getMonthMoment(year, month);
  const monthWithYear = DateFormatters.formatMonthWithYear(monthMoment.toDate());

  return (
    <FHStack>
      <FBox alignItems="center">
        <Text fontSize="18" fontWeight="extrabold" color="gray.400">
          {monthWithYear.toUpperCase()}
        </Text>
      </FBox>
    </FHStack>
  );
};

export default CalendarViewMonthName;
