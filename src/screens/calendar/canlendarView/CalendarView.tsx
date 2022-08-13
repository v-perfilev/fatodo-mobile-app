import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import Header from '../../../components/layouts/Header';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {Dimensions, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {CalendarActions, CalendarThunks} from '../../../store/calendar/calendarActions';
import {ListUtils} from '../../../shared/utils/ListUtils';
import CalendarViewContainer from './CalendarViewContainer';

const loadIndent = 5;
const months = CalendarUtils.generateAllCalendarMonths();
const monthKeys = months.map((r) => r.key);
const getInitialMonth = (): CalendarMonth => CalendarUtils.generateCurrentCalendarMonth();
const getInitialIndex = (): number => monthKeys.indexOf(getInitialMonth().key);

const CalendarView = () => {
  const dispatch = useAppDispatch();
  const loadedKeys = useAppSelector(CalendarSelectors.loadedKeys);
  const activeMonth = useAppSelector(CalendarSelectors.activeMonth);
  const [singleWidth, setSingleWidth] = useState<number>(Dimensions.get('window').width);
  const listRef = useRef<FlatListType>();

  const loadReminders = (): void => {
    const actualKeyLoaded = loadedKeys.includes(activeMonth.key);
    let monthsToLoad = CalendarUtils.generateCalendarMonths(activeMonth, loadIndent);
    const keysToLoad = monthsToLoad.map((r) => r.key);
    const missingKeys = keysToLoad.filter((key) => !loadedKeys.includes(key));
    const shouldLoad = !actualKeyLoaded || missingKeys.length >= loadIndent;
    shouldLoad && dispatch(CalendarThunks.handleReminderKeys(missingKeys));
  };

  const calcDimensions = () => {
    setSingleWidth(Dimensions.get('window').width);
  };

  const scrollToItem = (index: number, animated = true): void => {
    listRef.current?.scrollToIndex({index, animated});
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / singleWidth);
    if (index < months.length) {
      const activeMonth = months[index];
      dispatch(CalendarActions.selectMonth(activeMonth));
    }
  };

  const selectMonth = (month: CalendarItem): void => {
    const key = CalendarUtils.buildMonthKey(month.year, month.month);
    const index = monthKeys.indexOf(key);
    if (index && index < months.length) {
      const activeMonth = months[index];
      dispatch(CalendarActions.selectMonth(activeMonth));
      scrollToItem(index, false);
    }
  };

  const keyExtractor = useCallback((month: CalendarMonth): string => month.key, []);
  const renderItem = useCallback(
    (month: CalendarMonth): ReactElement => (
      <CalendarViewContainer month={month} selectMonth={selectMonth} width={singleWidth} />
    ),
    [singleWidth],
  );

  useEffect(() => {
    const initialMonth = getInitialMonth();
    selectMonth(initialMonth);
  }, []);

  useEffect(() => {
    activeMonth && loadReminders();
  }, [activeMonth]);

  return (
    <>
      <Header hideGoBack />
      <FlatList
        data={months}
        render={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={ListUtils.defaultContainerStyle()}
        onContentSizeChange={calcDimensions}
        scrollEventThrottle={200}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        fixedLength={singleWidth}
        initialScrollIndex={getInitialIndex()}
        onMomentumScrollEnd={handleScrollEnd}
        listRefs={[listRef]}
        initialNumToRender={1}
        maxToRenderPerBatch={3}
        updateCellsBatchingPeriod={10}
        windowSize={7}
      />
    </>
  );
};
export default CalendarView;
