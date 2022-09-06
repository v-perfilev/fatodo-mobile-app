import React, {memo, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {CalendarDate, CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {ScrollView} from 'react-native';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import RefreshableScrollView from '../../../components/scrollable/RefreshableScrollView';
import FBox from '../../../components/boxes/FBox';
import CalendarViewContent from './CalendarViewContent';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {CalendarReminder} from '../../../models/Reminder';

type CalendarViewContainerProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
  childRefMap: Map<string, MutableRefObject<ScrollView>>;
  width: number;
};

const CalendarViewContainer = ({month, selectMonth, childRefMap, width}: CalendarViewContainerProps) => {
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

  const isCurrentMonth = useMemo<boolean>(() => {
    const date = new Date();
    return date.getMonth() === month.month && date.getFullYear() === month.year;
  }, []);

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(CalendarActions.fetchRemindersThunk([month.key]));
  }, [month.key]);

  const initDate = useCallback((): void => {
    const newActiveDate = isCurrentMonth ? CalendarUtils.getNowDate() : undefined;
    if (newActiveDate?.date !== activeDate?.date) {
      setActiveDate(activeDate);
    }
  }, []);

  const scrollToTop = (): void => {
    scrollViewRef.current?.scrollTo({y: 0});
  };

  useEffect(() => {
    (activeDate !== undefined || isCurrentMonth) && initDate();
    childRefMap.set(month.key, scrollViewRef);
    return (): void => {
      childRefMap.delete(month.key);
    };
  }, []);

  scrollToTop();

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

export default memo(CalendarViewContainer);
