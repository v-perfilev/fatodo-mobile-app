import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {CalendarThunks} from '../../../store/calendar/calendarActions';
import {Divider} from 'native-base';
import FScrollView from '../../../components/boxes/FScrollView';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewMonthName from './CalendarViewMonthName';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import CalendarViewMonth from './CalendarViewMonth';
import CalendarViewReminders from './calendarViewReminders/CalendarViewReminders';
import {CalendarDate, CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {ScrollView} from 'react-native';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';

type CalendarViewContainerProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
};

const CalendarViewContainer = ({month, selectMonth}: CalendarViewContainerProps) => {
  const dispatch = useAppDispatch();
  const activeMonth = useAppSelector(CalendarSelectors.activeMonth);
  const [activeDate, setActiveDate] = useState<CalendarDate>();
  const ref = useRef<ScrollView>();

  const isActive = useMemo<boolean>(() => {
    return month.key === activeMonth?.key;
  }, [activeMonth]);

  const refresh = async (): Promise<void> => {
    await dispatch(CalendarThunks.fetchReminders([month.key]));
  };

  const initDate = (): void => {
    const date = new Date();
    const isCurrentMonth = date.getMonth() === month.month && date.getFullYear() === month.year;
    const shouldCurrentMonthUpdate = isCurrentMonth && activeDate?.date !== date.getDate();
    const shouldAnotherMonthUpdate = !isCurrentMonth && activeDate;
    if (shouldCurrentMonthUpdate || shouldAnotherMonthUpdate) {
      setActiveDate(isCurrentMonth ? CalendarUtils.getNowDate() : undefined);
    }
  };

  const scrollToTop = (): void => {
    ref.current.scrollTo({y: 0});
  };

  useEffect(() => {
    isActive && initDate();
    isActive && scrollToTop();
  }, [isActive]);

  return (
    <FScrollView p="0" refresh={refresh} ref={ref}>
      <FVStack flex="1" flexGrow="1" space="2" py="2">
        <CalendarViewMonthName month={month} selectMonth={selectMonth} />
        <Divider />
        <FVStack space="2">
          <CalendarViewWeekDays />
          <CalendarViewMonth month={month} activeDate={activeDate} selectDate={setActiveDate} />
        </FVStack>
        <Divider />
        <CalendarViewReminders month={month} activeDate={activeDate} />
      </FVStack>
    </FScrollView>
  );
};

export default memo(CalendarViewContainer);
