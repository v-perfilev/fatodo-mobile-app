import React, {memo, useMemo} from 'react';
import FHStack from '../../../../components/boxes/FHStack';
import FBox from '../../../../components/boxes/FBox';
import {DateUtils} from '../../../../shared/utils/DateUtils';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {CALENDAR_WEEKDAYS_HEIGHT} from '../../../../constants';

const CalendarViewWeekDays = () => {
  const {i18n} = useTranslation();

  const dayNames = useMemo(() => DateUtils.getWeekdayNames(), [i18n.language]);

  return (
    <FHStack height={`${CALENDAR_WEEKDAYS_HEIGHT}px`} px={1} alignItems="center">
      {dayNames.map((day) => (
        <FBox grow alignItems="center" key={day}>
          <Text fontSize="14" fontWeight="bold" color="gray.400">
            {day.toUpperCase()}
          </Text>
        </FBox>
      ))}
    </FHStack>
  );
};

export default memo(CalendarViewWeekDays);
