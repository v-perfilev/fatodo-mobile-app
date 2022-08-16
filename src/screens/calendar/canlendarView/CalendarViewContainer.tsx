import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {CalendarDate, CalendarItem, CalendarMonth} from '../../../models/Calendar';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import CalendarViewContent from './CalendarViewContent';
import {ScrollView} from 'react-native';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarThunks} from '../../../store/calendar/calendarActions';
import RefreshableScrollView from '../../../components/scrollable/RefreshableScrollView';
import FBox from '../../../components/boxes/FBox';

type CalendarViewContainerProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
  width: number;
};

const CalendarViewContainer = ({month, selectMonth, width}: CalendarViewContainerProps) => {
  const dispatch = useAppDispatch();
  const activeMonth = useAppSelector(CalendarSelectors.activeMonth);
  const [activeDate, setActiveDate] = useState<CalendarDate>();
  const ref = useRef<ScrollView>();

  const isCurrentMonth = useMemo<boolean>(() => {
    const date = new Date();
    return date.getMonth() === month.month && date.getFullYear() === month.year;
  }, []);

  const isActiveMonth = useMemo<boolean>(() => {
    return month.key === activeMonth?.key;
  }, [activeMonth]);

  const refresh = async (): Promise<void> => {
    await dispatch(CalendarThunks.fetchReminders([month.key]));
  };

  const initDate = (): void => {
    const activeDate = isCurrentMonth ? CalendarUtils.getNowDate() : undefined;
    setActiveDate(activeDate);
  };

  const scrollToTop = (): void => {
    ref.current.scrollTo({y: 0});
  };

  useEffect(() => {
    (activeDate !== undefined || isCurrentMonth) && initDate();
    isActiveMonth && scrollToTop();
  }, [isActiveMonth]);

  return (
    <FBox width={width}>
      <RefreshableScrollView refresh={refresh} ref={ref}>
        <CalendarViewContent
          month={month}
          selectMonth={selectMonth}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
        />
      </RefreshableScrollView>
    </FBox>
  );
};

export default CalendarViewContainer;
