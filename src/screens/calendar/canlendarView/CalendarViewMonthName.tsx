import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import {Text} from 'native-base';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import FBox from '../../../components/boxes/FBox';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import PressableButton from '../../../components/controls/PressableButton';
import {useCalendarDialogContext} from '../../../shared/contexts/dialogContexts/CalendarDialogContext';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';

type CalendarViewMonthNameProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
};

const CalendarViewMonthName = ({month, selectMonth}: CalendarViewMonthNameProps) => {
  const {showSelectMonthDialog} = useCalendarDialogContext();

  const monthMoment = CalendarUtils.getMonthMoment(month.year, month.month);
  const monthWithYear = DateFormatters.formatMonthWithYear(monthMoment.toDate());

  const handleMonthClick = (): void => {
    showSelectMonthDialog(month, selectMonth);
  };

  return (
    <FHStack>
      <FBox alignItems="center">
        <PressableButton onPress={handleMonthClick}>
          <FHStack smallSpace alignItems="center">
            <Text fontSize="18" fontWeight="extrabold" color="gray.400">
              {monthWithYear.toUpperCase()}
            </Text>
            <ArrowDownIcon color="primary.500" size="xl" />
          </FHStack>
        </PressableButton>
      </FBox>
    </FHStack>
  );
};

export default memo(CalendarViewMonthName);
