import React, {MutableRefObject, ReactElement, RefObject, useCallback, useEffect, useRef, useState} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {Dimensions, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, ScrollView} from 'react-native';
import FlatList, {FlatListType} from '../../../components/scrollable/FlatList';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CalendarViewContainer from './CalendarViewContainer';
import FBox from '../../../components/boxes/FBox';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import CalendarViewHeader from './CalendarViewHeader';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';

const width = Dimensions.get('window').width;
const months = CalendarUtils.generateAllCalendarMonths();
const monthKeys = months.map((r) => r.key);
const getInitialMonth = (): CalendarMonth => CalendarUtils.generateCurrentCalendarMonth();
const getInitialIndex = (month: CalendarMonth): number => monthKeys.indexOf(month.key);

const CalendarView = () => {
  const dispatch = useAppDispatch();
  const shouldLoad = useAppSelector(CalendarSelectors.shouldLoad);
  const listRef = useRef<FlatListType>();
  const childRefMap = useRef<Map<string, MutableRefObject<ScrollView>>>(new Map());
  const initialMonth = useRef<CalendarMonth>(getInitialMonth());
  const initialIndex = useRef<number>(getInitialIndex(initialMonth.current));
  const canMomentum = useRef<boolean>(false);
  const [activeMonth, setActiveMonth] = useState<CalendarMonth>(initialMonth.current);

  const scrollAllToTop = useCallback((): void => {
    const scrollToTop = (scrollView: RefObject<ScrollView>) => scrollView.current?.scrollTo({y: 0});
    Array.from(childRefMap.current.values()).forEach(scrollToTop);
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
        const activeMonth = months[index];
        setActiveMonth(activeMonth);
      }
    }
    canMomentum.current = false;
  }, []);

  const selectMonth = useCallback((month: CalendarItem): void => {
    const key = CalendarUtils.buildMonthKey(month.year, month.month);
    const index = monthKeys.indexOf(key);
    if (index && index >= 0 && index < months.length) {
      const activeMonth = months[index];
      scrollToItem(index, false);
      setActiveMonth(activeMonth);
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
    const loadReminders = async () => dispatch(CalendarActions.handleMonthThunk(activeMonth));
    loadReminders().finally();
  }, [shouldLoad, activeMonth]);

  return (
    <FBox width={width}>
      <CalendarViewHeader activeMonth={activeMonth} selectMonth={selectMonth} />
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
        windowSize={3}
        ref={listRef}
      />
    </FBox>
  );
};
export default CalendarView;
