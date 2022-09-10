import React, {MutableRefObject, ReactElement, useCallback, useEffect, useRef} from 'react';
import Header from '../../../components/layouts/Header';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {Dimensions, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, ScrollView} from 'react-native';
import FlatList, {FlatListType} from '../../../components/scrollable/FlatList';
import {useAppDispatch} from '../../../store/store';
import CalendarViewContainer from './CalendarViewContainer';
import FBox from '../../../components/boxes/FBox';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import {useIsFocused} from '@react-navigation/native';

const width = Dimensions.get('window').width;
const months = CalendarUtils.generateAllCalendarMonths();
const monthKeys = months.map((r) => r.key);
const getInitialMonth = (): CalendarMonth => CalendarUtils.generateCurrentCalendarMonth();
const getInitialIndex = (month: CalendarMonth): number => monthKeys.indexOf(month.key);

const CalendarView = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const listRef = useRef<FlatListType>();
  const childRefMap = useRef<Map<string, MutableRefObject<ScrollView>>>(new Map());
  const initialMonth = useRef<CalendarMonth>(getInitialMonth());
  const initialIndex = useRef<number>(getInitialIndex(initialMonth.current));
  const canMomentum = useRef<boolean>(false);

  const scrollAllToTop = useCallback((): void => {
    Array.from(childRefMap.current.values()).forEach((scrollView) => scrollView.current?.scrollTo({y: 0}));
  }, []);

  const loadReminders = useCallback((month: CalendarMonth): void => {
    dispatch(CalendarActions.handleMonthThunk(month));
  }, []);

  const scrollToItem = useCallback(
    (index: number, animated = true): void => {
      listRef.current?.scrollToIndex({index, animated});
    },
    [listRef.current],
  );

  const handleScrollBegin = useCallback((): void => {
    canMomentum.current = true;
    scrollAllToTop();
  }, []);

  const handleScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    if (canMomentum.current) {
      const offset = event.nativeEvent.contentOffset.x;
      const index = Math.round(offset / width);
      if (index < months.length) {
        loadReminders(months[index]);
      }
    }
    canMomentum.current = false;
  }, []);

  const selectMonth = useCallback((month: CalendarItem): void => {
    const key = CalendarUtils.buildMonthKey(month.year, month.month);
    const index = monthKeys.indexOf(key);
    if (index && index >= 0 && index < months.length) {
      scrollToItem(index, false);
      loadReminders(months[index]);
    }
  }, []);

  const keyExtractor = useCallback((month: CalendarMonth): string => month.key, []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<CalendarMonth>): ReactElement => (
      <CalendarViewContainer
        month={info.item}
        selectMonth={selectMonth}
        childRefMap={childRefMap.current}
        width={width}
      />
    ),
    [],
  );

  useEffect(() => {
    if (isFocused) {
      loadReminders(initialMonth.current);
    }
  }, [isFocused]);

  return (
    <>
      <FBox width={width}>
        <Header showAvatar hideGoBack />
        <FlatList
          data={months}
          render={renderItem}
          keyExtractor={keyExtractor}
          scrollEventThrottle={200}
          horizontal
          pagingEnabled
          decelerationRate="fast"
          fixedLength={width}
          onMomentumScrollBegin={handleScrollBegin}
          onMomentumScrollEnd={handleScrollEnd}
          initialScrollIndex={initialIndex.current}
          initialNumToRender={1}
          maxToRenderPerBatch={3}
          updateCellsBatchingPeriod={10}
          windowSize={3}
          ref={listRef}
        />
      </FBox>
    </>
  );
};
export default CalendarView;
