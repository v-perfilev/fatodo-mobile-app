import moment from 'moment';
import {CalendarReminder} from '../../models/Reminder';
import {CalendarDate, CalendarMonth} from '../../models/Calendar';

export class CalendarUtils {
  /*
  GETTERS
   */

  public static getCurrentDate = (): CalendarDate => {
    const now = moment();
    const year = now.year();
    const month = now.month();
    const date = now.date();
    return {year, month, date};
  };

  public static getMonthIndexByMonth = (value: CalendarMonth): number => {
    const dateMoment = moment({year: value.year, month: value.month, date: 1});
    return dateMoment.diff(CalendarConstants.firstDate, 'month');
  };

  public static getMonthIndexByDate = (value: CalendarDate): number => {
    const dateMoment = moment({year: value.year, month: value.month, date: value.date});
    return dateMoment.diff(CalendarConstants.firstDate, 'month');
  };

  public static getWeekIndexByDate = (value: CalendarDate): number => {
    const dateMoment = moment({year: value.year, month: value.month, date: value.date});
    return dateMoment.diff(CalendarConstants.firstDate, 'week');
  };

  public static getDayIndexByDate = (value: CalendarDate): number => {
    const dateMoment = moment({year: value.year, month: value.month, date: value.date});
    const day = dateMoment.day();
    return day === 0 ? 7 : day;
  };

  public static getCalendarDate = (monthIndex: number, dateIndex = 1): CalendarDate => {
    const dateMoment = CalendarConstants.firstDate
      .clone()
      .add(monthIndex, 'month')
      .add(dateIndex - 1, 'day');
    const year = dateMoment.year();
    const month = dateMoment.month();
    const date = dateMoment.date();
    return {year, month, date};
  };

  public static getWeekCountInMonth = (monthIndex: number): number => {
    const dateMoment = CalendarConstants.firstDate.clone().add(monthIndex, 'month');
    const year = dateMoment.year();
    const month = dateMoment.month();
    const momentDate = moment({year, month, date: 1});
    const monthFirstDate = {year, month, date: 1};
    const monthLastDate = {year, month, date: momentDate.daysInMonth()};
    return CalendarUtils.getWeekIndexByDate(monthLastDate) - CalendarUtils.getWeekIndexByDate(monthFirstDate) + 1;
  };

  /*
  GENERATORS
   */

  public static generateMonthDateByIndexes = (monthIndex: number, dateIndex: number): CalendarDate => {
    const dateMoment = CalendarConstants.firstDate.clone().add(monthIndex, 'month');
    const year = dateMoment.year();
    const month = dateMoment.month();
    const date = dateMoment.daysInMonth() >= dateIndex ? dateIndex : 1;
    return {year, month, date};
  };

  public static generateWeekDateByIndexes = (weekIndex: number, dayIndex: number): CalendarDate => {
    const dateMoment = CalendarConstants.firstDate
      .clone()
      .add(weekIndex, 'week')
      .add(dayIndex - 1, 'day');
    const year = dateMoment.year();
    const month = dateMoment.month();
    const date = dateMoment.date();
    return {year, month, date};
  };

  public static generateMonthDates = (index: number): CalendarDate[] => {
    const dateMoment = CalendarConstants.firstDate.clone().add(index, 'month');
    const year = dateMoment.year();
    const month = dateMoment.month();
    const monthMoment = moment({year, month, d: 10});

    const prevMonthMoment = monthMoment.clone().subtract(1, 'month');
    const nextMonthMoment = monthMoment.clone().add(1, 'month');

    const prevYear = prevMonthMoment.year();
    const prevMonth = prevMonthMoment.month();

    const nextYear = nextMonthMoment.year();
    const nextMonth = nextMonthMoment.month();

    const firstDateMoment = monthMoment.clone().startOf('month');
    const firstDateDay = firstDateMoment.day() === 0 ? 7 : firstDateMoment.day();
    const lastDateMoment = monthMoment.clone().endOf('month');
    const lastDateDay = lastDateMoment.day() === 0 ? 7 : lastDateMoment.day();
    const daysInMonth = monthMoment.daysInMonth();
    const daysPreviousInMonth = prevMonthMoment.daysInMonth();

    const calendarDates: CalendarDate[] = [];
    for (let i = 1; i < firstDateDay; i++) {
      const date = daysPreviousInMonth - firstDateDay + i + 1;
      const calendarDate: CalendarDate = {year: prevYear, month: prevMonth, date};
      calendarDates.push(calendarDate);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = i;
      const calendarDate: CalendarDate = {year, month, date, isCurrentMonth: true};
      calendarDates.push(calendarDate);
    }

    for (let i = lastDateDay + 1; i <= 7; i++) {
      const date = i - lastDateDay;
      const calendarDate: CalendarDate = {year: nextYear, month: nextMonth, date};
      calendarDates.push(calendarDate);
    }

    return calendarDates;
  };

  public static generateWeekDates = (index: number): CalendarDate[] => {
    const dateMoment = CalendarConstants.firstDate.clone().add(index, 'week');
    const calendarDates: CalendarDate[] = [];
    while (calendarDates.length < 7) {
      const year = dateMoment.year();
      const month = dateMoment.month();
      const date = dateMoment.date();
      const calendarDate: CalendarDate = {year, month, date};
      calendarDates.push(calendarDate);
      dateMoment.add(1, 'day');
    }
    return calendarDates;
  };

  public static generateCalendarMonths = (value: CalendarMonth, indent = 3): CalendarMonth[] => {
    const centralMoment = moment({year: value.year, month: value.month});
    const routes: CalendarMonth[] = [];
    for (let i = -indent; i <= indent; i++) {
      const m = centralMoment.clone().add(i, 'month');
      const year = m.year();
      const month = m.month();
      routes.push({year, month});
    }
    return routes;
  };

  /*
  REMINDERS
   */

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

  /*
  UTILS
   */

  public static buildMonthKey = (value: CalendarMonth): string => {
    const year = value.year;
    const month = value.month;
    return year + '_' + month;
  };

  public static getMonthDate = (value: CalendarMonth): Date => {
    const year = value.year;
    const month = value.month;
    return moment({year, month, d: 10}).toDate();
  };

  public static isCurrentDate = (value: CalendarDate): boolean => {
    const now = moment();
    const year = now.year();
    const month = now.month();
    const date = now.date();
    return value.year === year && value.month === month && value.date === date;
  };
}

export class CalendarConstants {
  public static readonly firstDate = moment({year: 1900, month: 0, date: 1});

  public static readonly lastDate = moment({year: 2100, month: 11, date: 31});

  public static maxMonthIndex = CalendarUtils.getMonthIndexByDate({
    year: CalendarConstants.lastDate.year(),
    month: CalendarConstants.lastDate.month(),
    date: CalendarConstants.lastDate.date(),
  });

  public static maxWeekIndex = CalendarUtils.getWeekIndexByDate({
    year: CalendarConstants.lastDate.year(),
    month: CalendarConstants.lastDate.month(),
    date: CalendarConstants.lastDate.date(),
  });
}
