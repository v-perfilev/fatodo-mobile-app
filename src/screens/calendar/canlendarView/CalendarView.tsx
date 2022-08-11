import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import Header from '../../../components/layouts/Header';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarItem, CalendarRoute} from '../../../models/Calendar';
// import {ScrollView} from 'native-base';
import {Dimensions, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import FBox from '../../../components/boxes/FBox';
import CalendarViewContainer from './CalendarViewContainer';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {CalendarThunks} from '../../../store/calendar/calendarActions';
import {ListUtils} from '../../../shared/utils/ListUtils';

const loadIndent = 3;
const routes = CalendarUtils.generateAllCalendarRoutes();
const routeKeys = routes.map((r) => r.key);
const getInitialRoute = (): CalendarRoute => CalendarUtils.generateCurrentCalendarRoute();
const getInitialIndex = (): number => routeKeys.indexOf(getInitialRoute().key);

const CalendarView = () => {
  const dispatch = useAppDispatch();
  const loadedKeys = useAppSelector(CalendarSelectors.loadedKeys);
  const [activeRoute, setActiveRoute] = useState<CalendarRoute>(getInitialRoute());
  const [singleWidth, setSingleWidth] = useState<number>(Dimensions.get('window').width);
  const listRef = useRef<FlatListType>();

  const loadReminders = (): void => {
    const actualKeyLoaded = loadedKeys.includes(activeRoute.key);
    let routesToLoad = CalendarUtils.generateCalendarRoutes(activeRoute, loadIndent);
    const keysToLoad = routesToLoad.map((r) => r.key);
    const missingKeys = keysToLoad.filter((key) => !loadedKeys.includes(key));
    const shouldLoad = !actualKeyLoaded || missingKeys.length >= loadIndent;
    shouldLoad && dispatch(CalendarThunks.handleReminderKeys(missingKeys));
  };

  const calcDimensions = () => {
    setSingleWidth(Dimensions.get('window').width);
  };

  const scrollToItem = (index: number, animated = true): void => {
    listRef.current.scrollToIndex({index, animated});
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / singleWidth);
    if (index < routes.length) {
      const activeRoute = routes[index];
      setActiveRoute(activeRoute);
    }
  };

  const selectMonth = (month: CalendarItem): void => {
    const key = CalendarUtils.buildMonthKey(month.year, month.month);
    const index = routeKeys.indexOf(key);
    if (index && index < routes.length) {
      const activeRoute = routes[index];
      setActiveRoute(activeRoute);
      scrollToItem(index, false);
    }
  };

  const keyExtractor = useCallback((route: CalendarRoute): string => route.key, []);
  const renderItem = useCallback(
    (route: CalendarRoute, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <FBox onLayout={onLayout} width={singleWidth}>
        <CalendarViewContainer month={route} selectMonth={selectMonth} isActive={route.key === activeRoute.key} />
      </FBox>
    ),
    [activeRoute],
  );

  useEffect(() => {
    loadReminders();
  }, [activeRoute]);

  return (
    <>
      <Header hideGoBack />
      <FlatList
        data={routes}
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
        listRef={listRef}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={3}
      />
    </>
  );
};
export default CalendarView;
