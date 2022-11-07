import React, {useMemo} from 'react';
import FHStack from '../src/components/boxes/FHStack';
import FBox from '../src/components/boxes/FBox';
import {DateUtils} from '../src/shared/utils/DateUtils';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';

const CalendarViewWeekDays = () => {
  const {i18n} = useTranslation();

  const dayNames = useMemo(() => DateUtils.getWeekdayNames(), [i18n.language]);

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

export default CalendarViewWeekDays;
