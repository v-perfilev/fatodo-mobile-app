import React from 'react';
import FHStack from '../../../components/boxes/FHStack';
import FBox from '../../../components/boxes/FBox';
import {DateUtils} from '../../../shared/utils/DateUtils';
import {Text} from 'native-base';

const CalendarViewWeekDays = () => {
  const dayNames = DateUtils.getWeekdayNames();

  return (
    <FHStack>
      {dayNames.map((day) => (
        <FBox alignItems="center" key={day}>
          <Text fontSize="14" fontWeight="extrabold" color="gray.400">
            {day.toUpperCase()}
          </Text>
        </FBox>
      ))}
    </FHStack>
  );
};

export default CalendarViewWeekDays;