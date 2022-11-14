import React, {memo, useCallback, useMemo} from 'react';
import {Text} from 'native-base';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarMonth} from '../../../models/Calendar';
import {useCalendarDialogContext} from '../../../shared/contexts/dialogContexts/CalendarDialogContext';
import {useTranslation} from 'react-i18next';
import {DateFormatters} from '../../../shared/utils/DateFormatters';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {CALENDAR_TITLE_HEIGHT} from '../../../constants';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import FHStack from '../../../components/boxes/FHStack';
import PressableButton from '../../../components/controls/PressableButton';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';

const CalendarViewTitle = () => {
  const dispatch = useAppDispatch();
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const {showSelectMonthDialog} = useCalendarDialogContext();
  const {i18n} = useTranslation();

  const month = useMemo<CalendarMonth>(() => {
    return CalendarUtils.getMonthByMonthIndex(monthIndex);
  }, [monthIndex]);

  const monthWithYear = useMemo<string>(() => {
    const monthDate = CalendarUtils.getMonthDate(month);
    const monthWithYear = DateFormatters.formatDate(monthDate, undefined, undefined, 'MONTH_YEAR');
    return monthWithYear.toUpperCase();
  }, [month, i18n.language]);

  const setMonth = useCallback((month: CalendarMonth) => {
    const date = {...month, date: 0};
    dispatch(CalendarActions.setDate(date));
  }, []);

  const handleMonthClick = (): void => {
    showSelectMonthDialog(month, setMonth);
  };

  return (
    <FHStack height={`${CALENDAR_TITLE_HEIGHT}px`} justifyContent="center" alignItems="center">
      <PressableButton onPress={handleMonthClick}>
        <FHStack smallSpace alignItems="center">
          <Text fontSize="16" fontWeight="bold" color="gray.400">
            {monthWithYear}
          </Text>
          <ArrowDownIcon color="primary.500" size="lg" />
        </FHStack>
      </PressableButton>
    </FHStack>
  );
};

export default memo(CalendarViewTitle);
