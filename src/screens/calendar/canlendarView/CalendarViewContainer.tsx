import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {CalendarDate, CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {ScrollView} from 'react-native';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarThunks} from '../../../store/calendar/calendarActions';
import RefreshableScrollView from '../../../components/scrollable/RefreshableScrollView';
import FBox from '../../../components/boxes/FBox';
import CalendarViewContent from './CalendarViewContent';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {CalendarReminder} from '../../../models/Reminder';

type CalendarViewContainerProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
  activeMonth: CalendarMonth;
  width: number;
};

const CalendarViewContainer = ({month, selectMonth, activeMonth, width}: CalendarViewContainerProps) => {
  const dispatch = useAppDispatch();
  const reminders = useAppSelector((state) => CalendarSelectors.reminders(state, month.key));
  const [activeDate, setActiveDate] = useState<CalendarDate>();
  const scrollViewRef = useRef<ScrollView>();

  const reminderMap = useMemo<Map<number, CalendarReminder[]>>(() => {
    const map = new Map<number, CalendarReminder[]>();
    Array.from({length: 31}).forEach((_, i) => map.set(i + 1, []));
    reminders.forEach((reminder) => map.get(new Date(reminder.date).getDate()).push(reminder));
    return map;
  }, [reminders]);

  const isActiveMonth = useMemo<boolean>(() => {
    return month.key === activeMonth?.key;
  }, [activeMonth]);

  const isCurrentMonth = useMemo<boolean>(() => {
    const date = new Date();
    return date.getMonth() === month.month && date.getFullYear() === month.year;
  }, []);

  const refresh = async (): Promise<void> => {
    await dispatch(CalendarThunks.fetchReminders([month.key]));
  };

  const initDate = (): void => {
    const activeDate = isCurrentMonth ? CalendarUtils.getNowDate() : undefined;
    setActiveDate(activeDate);
  };

  const scrollToTop = (): void => {
    scrollViewRef.current?.scrollTo({y: 0});
  };

  useEffect(() => {
    (activeDate !== undefined || isCurrentMonth) && initDate();
    isActiveMonth && scrollToTop();
  }, [isActiveMonth]);

  return (
    <FBox width={width}>
      <RefreshableScrollView refresh={refresh} ref={scrollViewRef}>
        <CalendarViewContent
          month={month}
          selectMonth={selectMonth}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          reminderMap={reminderMap}
          width={width}
        />
      </RefreshableScrollView>
    </FBox>
  );
};

export default CalendarViewContainer;
