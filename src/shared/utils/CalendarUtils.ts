import moment from 'moment';
import {CalendarReminder} from '../../models/Reminder';
import {ComparatorUtils} from './ComparatorUtils';
import {CalendarItem} from '../../models/Calendar';

export class CalendarUtils {
  public static generateCalendarItems = (indent: number = 2, item?: CalendarItem): CalendarItem[] => {
    const year = item ? item.year : new Date().getFullYear();
    const month = item ? item.month : new Date().getMonth();
    const centralMoment = moment({year, month});
    const items: CalendarItem[] = [];
    for (let i = -indent; i <= indent; i++) {
      const m = centralMoment.clone().add(i, 'month');
      items.push({year: m.year(), month: m.month()});
    }
    return items;
  };

  public static getMonthMoment = (year: number, month: number): moment.Moment => {
    return moment({year, month, d: 10});
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

    for (let i = lastDateDay; i < 7; i++) {
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

  public static buildMonthKey = (year: number, month: number): string => {
    return year + '_' + month;
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
}
