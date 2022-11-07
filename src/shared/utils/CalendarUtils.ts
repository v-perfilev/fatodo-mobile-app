import moment from 'moment';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarDate, CalendarItem, CalendarMonth} from '../../models/Calendar';

export class CalendarUtils {
  public static generateCurrentCalendarDate = (): CalendarDate => {
    const now = moment();
    const year = now.year();
    const month = now.month();
    const date = now.date();
    return {year, month, date};
  };

  public static generateMonthCalendarDate = (value: CalendarMonth): CalendarDate => {
    const now = moment();
    const currentYear = now.year();
    const currentMonth = now.month();
    const currentDate = now.date();
    const year = value.year;
    const month = value.month;
    const isCurrentMonth = year === currentYear && month === currentMonth;
    return isCurrentMonth ? {year, month, date: currentDate} : {year, month, date: 1};
  };

  public static generateDateCalendarMonth = (value: CalendarDate): CalendarMonth => {
    const year = value.year;
    const month = value.month;
    const key = CalendarUtils.buildMonthKey(year, month);
    return {year, month, key};
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

  public static getWeekCountInMonth = (year: number, month: number): number => {
    const monthFirstDate = moment({year, month, d: 1});
    const monthLastDate = moment({year, month, d: monthFirstDate.daysInMonth()});
    return monthLastDate.week() - monthFirstDate.week() + 1;
  };

  public static isCurrentDate = (value: CalendarDate): boolean => {
    const now = moment();
    const year = now.year();
    const month = now.month();
    const date = now.date();
    return value.year === year && value.month === month && value.date === date;
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

    const calendarDates: CalendarDate[] = [];
    for (let i = 1; i < firstDateDay; i++) {
      const date = daysPreviousInMonth - firstDateDay + i + 1;
      const calendarDate: CalendarDate = {year, month, date, isCurrentMonth: false};
      calendarDates.push(calendarDate);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = i;
      const calendarDate: CalendarDate = {year, month, date, isCurrentMonth: true};
      calendarDates.push(calendarDate);
    }

    for (let i = lastDateDay + 1; i <= 7; i++) {
      const date = i - lastDateDay;
      const calendarDate: CalendarDate = {year, month, date, isCurrentMonth: false};
      calendarDates.push(calendarDate);
    }

    return calendarDates;
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
