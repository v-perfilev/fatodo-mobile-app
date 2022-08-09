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

type RenderProps = {route: CalendarRoute} & SceneRendererProps;

export const calendarIndent = 3;
const initialRoutes = CalendarUtils.generateCalendarRoutes(calendarIndent);

const CalendarView = () => {
  const dispatch = useAppDispatch();
  const loadedKeys = useAppSelector(CalendarSelectors.loadedKeys);
  const [routes, setRoutes] = useState<CalendarRoute[]>(initialRoutes);

  const calcRoutes = (index: number): void => {
    const route = routes[index];
    const updatedRoute = CalendarUtils.generateCalendarRoutes(calendarIndent, route);
    setRoutes(updatedRoute);
  };

  const selectMonth = (month: CalendarItem): void => {
    const updatedRouteWithoutIndent = CalendarUtils.generateCalendarRoutes(0, month);
    const updatedRoute = CalendarUtils.generateCalendarRoutes(calendarIndent, month);
    setRoutes(updatedRouteWithoutIndent);
    setTimeout(() => setRoutes(updatedRoute), 50);
  };

  const renderScene = ({route}: RenderProps): ReactElement => (
    <CalendarViewContainer
      month={route}
      selectMonth={selectMonth}
      isActive={routes.indexOf(route) === calendarIndent}
    />
  );

  useEffect(() => {
    const actualKeys = routes.map((r) => r.key);
    const missingKeys = actualKeys.filter((key) => !loadedKeys.includes(key));
    missingKeys.length >= calendarIndent && dispatch(CalendarThunks.handleReminderKeys(missingKeys));
  }, [loadedKeys, routes]);

  return (
    <>
      <Header hideGoBack />
      <TabView
        navigationState={{index: calendarIndent, routes}}
        renderScene={renderScene}
        onIndexChange={calcRoutes}
        renderTabBar={() => null}
        onSwipeStart={console.log}
      />
    </>
  );
};
export default CalendarView;
