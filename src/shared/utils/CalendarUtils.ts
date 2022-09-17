import moment from 'moment';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarDate, CalendarItem, CalendarMonth} from '../../models/Calendar';

export class CalendarUtils {
  public static generateCurrentCalendarMonth = (): CalendarMonth => {
    const now = moment();
    const year = now.year();
    const month = now.month();
    const key = CalendarUtils.buildMonthKey(year, month);
    return {key, year, month};
  };

  public static generateAllCalendarMonths = (): CalendarMonth[] => {
    const routes: CalendarMonth[] = [];
    for (let year = 1900; year <= 2100; year++) {
      for (let month = 0; month <= 11; month++) {
        const key = CalendarUtils.buildMonthKey(year, month);
        routes.push({key, year, month});
      }
    }
    return routes;
  };

  public static generateCalendarMonths = (item: CalendarItem, indent: number = 3): CalendarMonth[] => {
    const centralMoment = moment({year: item.year, month: item.month});
    const routes: CalendarMonth[] = [];
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

  public static getNowDate = (isCurrentMonth = true): CalendarDate => {
    return {date: new Date().getDate(), isCurrentMonth};
  };

  public static getOnePageDates = (year: number, month: number): CalendarDate[] => {
    const monthMoment = moment({year, month, d: 10});
    const previousMonthMoment = monthMoment.clone().subtract(1, 'month');
    const firstDateMoment = monthMoment.clone().startOf('month');
    const firstDateDay = firstDateMoment.day() === 0 ? 7 : firstDateMoment.day();
    const lastDateMoment = monthMoment.clone().endOf('month');
    const lastDateDay = lastDateMoment.day() === 0 ? 7 : lastDateMoment.day();
    const daysInMonth = monthMoment.daysInMonth();
    const daysPreviousInMonth = previousMonthMoment.daysInMonth();

    const dates: CalendarDate[] = [];
    for (let i = 1; i < firstDateDay; i++) {
      const date: CalendarDate = {date: daysPreviousInMonth - firstDateDay + i + 1, isCurrentMonth: false};
      dates.push(date);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date: CalendarDate = {date: i, isCurrentMonth: true};
      dates.push(date);
    }

    for (let i = lastDateDay + 1; i <= 7; i++) {
      const date: CalendarDate = {date: i - lastDateDay, isCurrentMonth: false};
      dates.push(date);
    }

    return dates;
  };

  public static extractRemindersGroupIds = (reminders: CalendarReminder[]): string[] => {
    return reminders.map((r) => r.parentId);
  };

  public static extractRemindersItemIds = (reminders: CalendarReminder[]): string[] => {
    return reminders.map((r) => r.targetId);
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
}
