import React, {memo, useCallback, useMemo} from 'react';
import FHStack from '../src/components/boxes/FHStack';
import {Spinner, Text} from 'native-base';
import {CalendarUtils} from '../src/shared/utils/CalendarUtils';
import {CalendarItem, CalendarMonth} from '../src/models/Calendar';
import PressableButton from '../src/components/controls/PressableButton';
import {useCalendarDialogContext} from '../src/shared/contexts/dialogContexts/CalendarDialogContext';
import ArrowDownIcon from '../src/components/icons/ArrowDownIcon';
import {useTranslation} from 'react-i18next';
import {DateFormatters} from '../src/shared/utils/DateFormatters';
import {useAppSelector} from '../src/store/store';
import CalendarSelectors from '../src/store/calendar/calendarSelectors';
import FBox from '../src/components/boxes/FBox';

type CalendarViewMonthNameProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
};

const CalendarViewMonthName = ({month, selectMonth}: CalendarViewMonthNameProps) => {
  const loadingSelector = useCallback(CalendarSelectors.makeLoadingSelector(), []);
  const loading = useAppSelector((state) => loadingSelector(state, month.key));
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

  const loader = (
    <FBox position="absolute" right="3" h="100%" justifyContent="center">
      <Spinner size={25} />
    </FBox>
  );

  return (
    <FHStack position="relative" justifyContent="center" alignItems="center">
      <PressableButton onPress={handleMonthClick}>
        <FHStack smallSpace alignItems="center">
          <Text fontSize="16" fontWeight="bold" color="gray.400">
            {monthWithYear}
          </Text>
          <ArrowDownIcon color="primary.500" size="lg" />
        </FHStack>
      </PressableButton>
      {loading && loader}
    </FHStack>
  );
};

export default memo(CalendarViewMonthName);
