import React, {ComponentType, ReactElement, useMemo, useState} from 'react';
import Header from '../../../components/layouts/Header';
import CalendarViewContainer from './CalendarViewContainer';
import {SceneMap, TabView} from 'react-native-tab-view';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarItem} from '../../../models/Calendar';

const CalendarElement = (year: number, month: number) => (): ReactElement =>
  <CalendarViewContainer year={year} month={month} />;

const buildSceneMap = (items: CalendarItem[]) => {
  const scenes: {[key: string]: ComponentType<any>} = {};
  items.forEach((calendarItem) => {
    const key = CalendarUtils.buildMonthKey(calendarItem.year, calendarItem.month);
    scenes[key] = CalendarElement(calendarItem.year, calendarItem.month);
  });
  return SceneMap(scenes);
};

const buildRoutes = (items: CalendarItem[]) => {
  return items.map((i) => ({key: CalendarUtils.buildMonthKey(i.year, i.month)}));
};

const initialItems = CalendarUtils.generateCalendarItems(1);

const CalendarView = () => {
  const [items, setItems] = useState<CalendarItem[]>(initialItems);

  const renderScene = useMemo(() => buildSceneMap(items), [items]);
  const routes = useMemo(() => buildRoutes(items), [items]);

  const handleIndexChange = (newIndex: number): void => {
    const year = items[newIndex].year;
    const month = items[newIndex].month;
    const newItems = CalendarUtils.generateCalendarItems(1, {year, month});
    setItems(newItems);
  };

  return (
    <>
      <Header hideGoBack />
      <TabView
        navigationState={{index: 1, routes}}
        renderScene={renderScene}
        renderTabBar={() => null}
        onIndexChange={handleIndexChange}
      />
    </>
  );
};

export default CalendarView;
