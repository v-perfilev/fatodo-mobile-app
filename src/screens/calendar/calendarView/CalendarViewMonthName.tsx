import React, {memo, useCallback, useMemo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Spinner, Text} from 'native-base';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarDate, CalendarMonth} from '../../../models/Calendar';
import PressableButton from '../../../components/controls/PressableButton';
import {useCalendarDialogContext} from '../../../shared/contexts/dialogContexts/CalendarDialogContext';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import {useTranslation} from 'react-i18next';
import {DateFormatters} from '../../../shared/utils/DateFormatters';
import {useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import FBox from '../../../components/boxes/FBox';

type CalendarViewMonthNameProps = {
  height: number;
  date: CalendarDate;
  setDate: (month: CalendarDate) => void;
};

const CalendarViewMonthName = ({height, date, setDate}: CalendarViewMonthNameProps) => {
  const month = useMemo<CalendarMonth>(() => CalendarUtils.generateDateCalendarMonth(date), [date.year, date.month]);
  const loadingSelector = useCallback(CalendarSelectors.makeLoadingSelector(), []);
  const loading = useAppSelector((state) => loadingSelector(state, month.key));
  const {showSelectMonthDialog} = useCalendarDialogContext();
  const {i18n} = useTranslation();

  const monthWithYear = useMemo(() => {
    const monthMoment = CalendarUtils.getMonthMoment(month.year, month.month);
    const monthWithYear = DateFormatters.formatDate(monthMoment.toDate(), undefined, undefined, 'MONTH_YEAR');
    return monthWithYear.toUpperCase();
  }, [month, i18n.language]);

  const setMonth = useCallback((month: CalendarMonth) => {
    const newDate = CalendarUtils.generateMonthCalendarDate(month);
    setDate(newDate);
  }, []);

  const handleMonthClick = (): void => {
    showSelectMonthDialog(month, setMonth);
  };

  const loader = (
    <FBox position="absolute" right="3" h="100%" justifyContent="center">
      <Spinner size={25} />
    </FBox>
  );

  return (
    <FHStack position="relative" height={`${height}px`} justifyContent="center" alignItems="center">
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
