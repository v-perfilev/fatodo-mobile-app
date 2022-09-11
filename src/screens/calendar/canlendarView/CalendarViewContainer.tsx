import React, {memo, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch} from '../../../store/store';
import {CalendarDate, CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {ScrollView} from 'react-native';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import RefreshableScrollView from '../../../components/scrollable/RefreshableScrollView';
import FBox from '../../../components/boxes/FBox';
import CalendarViewContent from './CalendarViewContent';

type CalendarViewContainerProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
  childRefMap: Map<string, MutableRefObject<ScrollView>>;
  width: number;
};

const CalendarViewContainer = ({month, selectMonth, childRefMap, width}: CalendarViewContainerProps) => {
  const dispatch = useAppDispatch();
  const [activeDate, setActiveDate] = useState<CalendarDate>();
  const scrollViewRef = useRef<ScrollView>();

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

  useEffect(() => {
    (activeDate !== undefined || isCurrentMonth) && initDate();
    childRefMap.set(month.key, scrollViewRef);
    return (): void => {
      childRefMap.delete(month.key);
    };
  }, []);

  return (
    <FBox width={width}>
      <RefreshableScrollView refresh={refresh} ref={scrollViewRef}>
        <CalendarViewContent
          month={month}
          selectMonth={selectMonth}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          width={width}
        />
      </RefreshableScrollView>
    </FBox>
  );
};

export default memo(CalendarViewContainer);
