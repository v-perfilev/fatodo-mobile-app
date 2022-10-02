import React, {memo, useMemo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Text} from 'native-base';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import FBox from '../../../components/boxes/FBox';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import PressableButton from '../../../components/controls/PressableButton';
import {useCalendarDialogContext} from '../../../shared/contexts/dialogContexts/CalendarDialogContext';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import {useTranslation} from 'react-i18next';
import {DateFormatters} from '../../../shared/utils/DateFormatters';

type CalendarViewMonthNameProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
};

const CalendarViewMonthName = ({month, selectMonth}: CalendarViewMonthNameProps) => {
  const {showSelectMonthDialog} = useCalendarDialogContext();
  const {i18n} = useTranslation();

  const monthWithYear = useMemo(() => {
    const monthMoment = CalendarUtils.getMonthMoment(month.year, month.month);
    const monthWithYear = DateFormatters.formatDate(monthMoment.toDate(), undefined, undefined, 'MONTH_YEAR');
    return monthWithYear.toUpperCase();
  }, [i18n.language]);

  const handleMonthClick = (): void => {
    showSelectMonthDialog(month, selectMonth);
  };

  return (
    <FHStack>
      <FBox alignItems="center">
        <PressableButton onPress={handleMonthClick}>
          <FHStack smallSpace alignItems="center">
            <Text fontSize="16" fontWeight="bold" color="gray.400">
              {monthWithYear}
            </Text>
            <ArrowDownIcon color="primary.500" size="lg" />
          </FHStack>
        </PressableButton>
      </FBox>
    </FHStack>
  );
};

export default memo(CalendarViewMonthName);
