import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import FBox from '../../../components/boxes/FBox';
import {DateUtils} from '../../../shared/utils/DateUtils';
import {Text} from 'native-base';

const CalendarViewWeekDays = () => {
  const dayNames = DateUtils.getWeekdayNames();

  return (
    <FHStack mx="2px">
      {dayNames.map((day) => (
        <FBox alignItems="center" key={day}>
          <Text fontSize="14" fontWeight="bold" color="gray.400">
            {day.toUpperCase()}
          </Text>
        </FBox>
      ))}
    </FHStack>
  );
};

export default memo(CalendarViewWeekDays);
