import React, {memo, useMemo} from 'react';
import {Text} from 'native-base';
import {CalendarDate, CalendarMonth} from '../../../models/Calendar';
import {useCalendarDialogContext} from '../../../shared/contexts/dialogContexts/CalendarDialogContext';
import {useTranslation} from 'react-i18next';
import {CALENDAR_TITLE_HEIGHT} from '../../../constants';
import FHStack from '../../../components/boxes/FHStack';
import PressableButton from '../../../components/controls/PressableButton';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import {useCalendarContext} from '../../../shared/contexts/CalendarContext';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {DateFormatters} from '../../../shared/utils/DateFormatters';
import {useForceUpdate} from '../../../shared/hooks/useForceUpdate';
import {runOnJS, useDerivedValue} from 'react-native-reanimated';

const CalendarViewTitle = () => {
  const {dateIndex, monthIndex, setDate} = useCalendarContext();
  const {showSelectDateDialog} = useCalendarDialogContext();
  const {i18n} = useTranslation();
  const forceUpdate = useForceUpdate();

  const month = useMemo<CalendarMonth>(() => {
    return CalendarUtils.getMonthByMonthIndex(monthIndex.value);
  }, [monthIndex.value]);

  const monthWithYear = useMemo<string>(() => {
    const monthDate = CalendarUtils.getMonthDate(month);
    const monthWithYear = DateFormatters.formatDate(monthDate, undefined, undefined, 'MONTH_YEAR');
    return monthWithYear.toUpperCase();
  }, [month, i18n.language]);

  const handleMonthClick = (): void => {
    const date = CalendarUtils.getDateByDateIndex(dateIndex.value);
    const selectDate = (selectedDate: CalendarDate) => setDate(selectedDate);
    showSelectDateDialog(date, selectDate);
  };

  useDerivedValue(() => {
    runOnJS(forceUpdate)(monthIndex.value);
  });

  return (
    <FHStack height={`${CALENDAR_TITLE_HEIGHT}px`} justifyContent="center" alignItems="center">
      <PressableButton onPress={handleMonthClick}>
        <FHStack space="1" alignItems="center">
          <Text fontWeight="bold" color="gray.400">
            {monthWithYear}
          </Text>
          <ArrowDownIcon color="primary.500" size="lg" />
        </FHStack>
      </PressableButton>
    </FHStack>
  );
};

export default memo(CalendarViewTitle);
