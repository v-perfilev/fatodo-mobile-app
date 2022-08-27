import React, {ReactElement, useEffect, useRef, useState} from 'react';
import Header from '../../../components/layouts/Header';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {Dimensions, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import FlatList, {FlatListType} from '../../../components/scrollable/FlatList';
import {useAppDispatch} from '../../../store/store';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import CalendarViewContainer from './CalendarViewContainer';
import {useIsFocused} from '@react-navigation/native';

const months = CalendarUtils.generateAllCalendarMonths();
const monthKeys = months.map((r) => r.key);
const getInitialMonth = (): CalendarMonth => CalendarUtils.generateCurrentCalendarMonth();
const getInitialIndex = (month: CalendarMonth): number => monthKeys.indexOf(month.key);
const width = Dimensions.get('window').width;

const CalendarView = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const [activeMonth, setActiveMonth] = useState<CalendarMonth>(getInitialMonth());
  const listRef = useRef<FlatListType>();

  const loadReminders = (): void => {
    dispatch(CalendarActions.handleMonthThunk(activeMonth));
  };

  const scrollToItem = (index: number, animated = true): void => {
    listRef.current?.scrollToIndex({index, animated});
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / width);
    if (index < months.length) {
      setActiveMonth(months[index]);
    }
  };

  const selectMonth = (month: CalendarItem): void => {
    const key = CalendarUtils.buildMonthKey(month.year, month.month);
    const index = monthKeys.indexOf(key);
    if (index && index >= 0 && index < months.length) {
      scrollToItem(index, false);
      setActiveMonth(months[index]);
    }
  };

  const keyExtractor = (month: CalendarMonth): string => month.key;
  const renderItem = (month: CalendarMonth): ReactElement => (
    <CalendarViewContainer month={month} selectMonth={selectMonth} activeMonth={activeMonth} width={width} />
  );

  useEffect(() => {
    isFocused && loadReminders();
  }, [isFocused, activeMonth]);

  return (
    <>
      <Header hideGoBack />
      <FlatList
        data={months}
        render={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={200}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        fixedLength={width}
        initialScrollIndex={getInitialIndex(activeMonth)}
        onMomentumScrollEnd={handleScrollEnd}
        initialNumToRender={1}
        maxToRenderPerBatch={3}
        updateCellsBatchingPeriod={10}
        windowSize={3}
        ref={listRef}
      />
    </>
  );
};
export default CalendarView;
