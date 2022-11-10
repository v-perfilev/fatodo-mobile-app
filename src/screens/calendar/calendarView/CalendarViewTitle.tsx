import React, {memo, useCallback, useMemo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Spinner, Text} from 'native-base';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarMonth} from '../../../models/Calendar';
import PressableButton from '../../../components/controls/PressableButton';
import {useCalendarDialogContext} from '../../../shared/contexts/dialogContexts/CalendarDialogContext';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import {useTranslation} from 'react-i18next';
import {DateFormatters} from '../../../shared/utils/DateFormatters';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import FBox from '../../../components/boxes/FBox';
import {CALENDAR_TITLE_HEIGHT} from '../../../constants';
import {CalendarActions} from '../../../store/calendar/calendarActions';

const CalendarViewTitle = () => {
  const dispatch = useAppDispatch();
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const month = useMemo<CalendarMonth>(() => CalendarUtils.getCalendarDate(monthIndex), [monthIndex]);
  const monthKey = useMemo<string>(() => CalendarUtils.buildMonthKey(month), [month]);
  const loadingSelector = useCallback(CalendarSelectors.makeLoadingSelector(), []);
  const loading = useAppSelector((state) => loadingSelector(state, monthKey));
  const {showSelectMonthDialog} = useCalendarDialogContext();
  const {i18n} = useTranslation();

  const monthWithYear = useMemo<string>(() => {
    const date = CalendarUtils.getMonthDate(month);
    const monthWithYear = DateFormatters.formatDate(date, undefined, undefined, 'MONTH_YEAR');
    return monthWithYear.toUpperCase();
  }, [month, i18n.language]);

  const setMonth = useCallback((month: CalendarMonth) => {
    const monthIndex = CalendarUtils.getMonthIndexByMonth(month);
    dispatch(CalendarActions.selectMonth(monthIndex));
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
    <FHStack height={`${CALENDAR_TITLE_HEIGHT}px`} justifyContent="center" alignItems="center">
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

export default memo(CalendarViewTitle);
