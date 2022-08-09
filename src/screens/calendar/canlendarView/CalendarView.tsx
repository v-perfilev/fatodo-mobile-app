import React, {ReactElement, useEffect, useState} from 'react';
import Header from '../../../components/layouts/Header';
import CalendarViewContainer from './CalendarViewContainer';
import {TabView} from 'react-native-tab-view';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarItem, CalendarRoute} from '../../../models/Calendar';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {CalendarThunks} from '../../../store/calendar/calendarActions';
import {SceneRendererProps} from 'react-native-tab-view/lib/typescript/types';
import {Dimensions} from 'react-native';
import {View} from 'native-base';

type RenderProps = {route: CalendarRoute} & SceneRendererProps;

const routeIndent = 12;
const renderIndent = 4;
const initialRoutes = CalendarUtils.generateCalendarRoutes(routeIndent);

const CalendarView = () => {
  const dispatch = useAppDispatch();
  const loadedKeys = useAppSelector(CalendarSelectors.loadedKeys);
  const [routes, setRoutes] = useState<CalendarRoute[]>(initialRoutes);

  const calcRoutes = (index: number): void => {
    const route = routes[index];
    const updatedRoute = CalendarUtils.generateCalendarRoutes(routeIndent, route);
    setRoutes(updatedRoute);
  };

  const selectMonth = (month: CalendarItem): void => {
    const updatedRouteWithoutIndent = CalendarUtils.generateCalendarRoutes(0, month);
    const updatedRoute = CalendarUtils.generateCalendarRoutes(routeIndent, month);
    setRoutes(updatedRouteWithoutIndent);
    setTimeout(() => setRoutes(updatedRoute), 50);
  };

  const renderScene = ({route}: RenderProps): ReactElement =>
    Math.abs(routeIndent - routes.indexOf(route)) <= renderIndent ? (
      <CalendarViewContainer month={route} selectMonth={selectMonth} isActive={routes.indexOf(route) === routeIndent} />
    ) : (
      <View />
    );

  useEffect(() => {
    const actualKeys = routes.map((r) => r.key);
    const missingKeys = actualKeys.filter((key) => !loadedKeys.includes(key));
    missingKeys.length >= renderIndent && dispatch(CalendarThunks.handleReminderKeys(missingKeys));
  }, [routes]);

  return (
    <>
      <Header hideGoBack />
      <TabView
        navigationState={{index: routeIndent, routes}}
        renderScene={renderScene}
        onIndexChange={calcRoutes}
        renderTabBar={() => null}
        initialLayout={{width: Dimensions.get('window').width}}
      />
    </>
  );
};
export default CalendarView;
