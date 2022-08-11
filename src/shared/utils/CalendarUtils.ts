import moment from 'moment';
import {CalendarReminder} from '../../models/Reminder';
import {ComparatorUtils} from './ComparatorUtils';
import {CalendarItem, CalendarRoute} from '../../models/Calendar';
import {MapUtils} from './MapUtils';

export class CalendarUtils {
  public static generateCurrentCalendarRoute = (): CalendarRoute => {
    const now = moment();
    const year = now.year();
    const month = now.month();
    const key = CalendarUtils.buildMonthKey(year, month);
    return {key, year, month};
  };

  public static generateAllCalendarRoutes = (): CalendarRoute[] => {
    const routes: CalendarRoute[] = [];
    for (let year = 1900; year <= 2100; year++) {
      for (let month = 0; month < 11; month++) {
        const key = CalendarUtils.buildMonthKey(year, month);
        routes.push({key, year, month});
      }
    }
    return routes;
  };

  public static generateCalendarRoutes = (item: CalendarItem, indent: number = 3): CalendarRoute[] => {
    const centralMoment = moment({year: item.year, month: item.month});
    const routes: CalendarRoute[] = [];
    for (let i = -indent; i <= indent; i++) {
      const m = centralMoment.clone().add(i, 'month');
      const year = m.year();
      const month = m.month();
      const key = CalendarUtils.buildMonthKey(year, month);
      routes.push({key, year, month});
    }
    return routes;
  };

  public static getMonthMoment = (year: number, month: number): moment.Moment => {
    return moment({year, month, d: 10});
  };

  public static getNowMoment = (): moment.Moment => {
    return moment().set({hours: 12, minutes: 0, seconds: 0, milliseconds: 0});
  };

  public static getOnePageMoments = (year: number, month: number): moment.Moment[] => {
    const monthMoment = moment({year, month, d: 10});
    const firstDateMoment = monthMoment.clone().startOf('month');
    const firstDateDay = firstDateMoment.day() === 0 ? 7 : firstDateMoment.day();
    const lastDateMoment = monthMoment.clone().endOf('month');
    const lastDateDay = lastDateMoment.day() === 0 ? 7 : lastDateMoment.day();
    const daysInMonth = monthMoment.daysInMonth();

    const dates: moment.Moment[] = [];
    for (let i = 1; i < firstDateDay; i++) {
      const date = firstDateMoment.clone().subtract(firstDateDay - i, 'days');
      dates.push(date);
    }

    for (let i = 0; i < daysInMonth; i++) {
      const date = firstDateMoment.clone().add(i, 'day');
      dates.push(date);
    }

    for (let i = lastDateDay + 1; i <= 7; i++) {
      const date = lastDateMoment.clone().add(i - lastDateDay, 'days');
      dates.push(date);
    }

    return dates;
  };

  public static splitMonthInWeeks = (dates: moment.Moment[]): moment.Moment[][] => {
    const weekDates: moment.Moment[][] = [];
    dates.forEach((d, i) => {
      const weekIndex = Math.floor(i / 7);
      if (!weekDates[weekIndex]) {
        weekDates[weekIndex] = [];
      }
      weekDates[weekIndex].push(d);
    });
    return weekDates;
  };

  public static filterByMoment = (reminders: CalendarReminder[], date: moment.Moment): CalendarReminder[] => {
    return reminders.filter((r) => new Date(r.date).getDate() === date.date()).sort(ComparatorUtils.dateComparator);
  };

  public static extractRemindersGroupIds = (reminders: CalendarReminder[]): string[] => {
    return reminders.map((r) => r.parentId);
  };

  public static extractRemindersItemIds = (reminders: CalendarReminder[]): string[] => {
    return reminders.map((r) => r.targetId);
  };

  public static extractKeysToLoad = <T>(keys: string[], reminders: [string, T][], loadingKeys: string[]): string[] => {
    const map = new Map(reminders);
    const existingKeys = Array.from(map.keys());
    const notAllowedIds = [...existingKeys, ...loadingKeys];
    return keys.filter((key) => !notAllowedIds.includes(key));
  };

  public static extractDatesToLoad = (keys: string[]): [number, number, number, number] => {
    const yearFrom = Number(keys[0].slice(0, 4));
    const monthFrom = Number(keys[0].slice(5));
    const yearTo = Number(keys[keys.length - 1].slice(0, 4));
    const monthTo = Number(keys[keys.length - 1].slice(5));
    return [yearFrom, monthFrom, yearTo, monthTo];
  };

  public static buildMonthKey = (year: number, month: number): string => {
    return year + '_' + month;
  };

  public static updateRemindersMap = (
    stateMap: [string, CalendarReminder[]][],
    newMap: [string, CalendarReminder[]][],
    keys: string[],
  ): [string, any][] => {
    const map = new Map(newMap);
    keys.forEach((key) => {
      const value = map.get(key) || [];
      stateMap = MapUtils.setValue(stateMap, key, value);
    });
    return stateMap;
  };

  public static preparePendingLoadingKeys = (loadingKeys: string[], newKeys: string[]): string[] => {
    return [...loadingKeys, ...newKeys];
  };

  public static prepareFinishedLoadingKeys = (loadingKeys: string[], newKeys: string[]): string[] => {
    return loadingKeys.filter((key) => !newKeys.includes(key));
  };
}
