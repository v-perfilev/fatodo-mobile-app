import {tz} from 'moment-timezone';
import {DateParams} from '../../models/DateParams';

export class DateConverters {
  static getParamDateFromTimeAndDate = (
    time: Date,
    date: Date,
    timezone: string,
    withoutYear?: boolean,
  ): DateParams => {
    if (!time && !date) {
      return null;
    }
    let result: DateParams = {timezone, time: undefined};
    if (time) {
      result = {
        ...result,
        time: time.getHours() * 60 + time.getMinutes(),
      };
    }
    if (date) {
      result = {
        ...result,
        date: date.getDate(),
        month: date.getMonth(),
        year: withoutYear ? undefined : date.getFullYear(),
      };
    }
    return result;
  };

  static getTimeFromParamDate = (paramDate: DateParams, timezone: string): Date => {
    if (!paramDate || paramDate.time === null || paramDate.time === undefined) {
      return null;
    }
    const time = DateConverters.getTimeWithTimezone(paramDate, timezone);
    const date = new Date(0);
    date.setHours(Math.floor(time / 60));
    date.setMinutes(time % 60);
    return date;
  };

  static getDateFromParamDate = (paramDate: DateParams, timezone: string): Date => {
    if (!paramDate || (!paramDate.date && !paramDate.month && !paramDate.year)) {
      return null;
    }
    const dateDifference = DateConverters.getDateDifferenceWithTimezone(paramDate, timezone);
    const date = new Date(0);
    if (paramDate.date) {
      date.setDate(paramDate.date);
    }
    if (paramDate.month) {
      date.setMonth(paramDate.month);
    }
    if (paramDate.year) {
      date.setFullYear(paramDate.year);
    }
    if (dateDifference !== 0) {
      date.setDate(date.getDate() + dateDifference);
    }
    return date;
  };

  static getWeekDaysFromParamDate = (paramDate: DateParams, weekDays: number[], timezone: string): number[] => {
    if (!weekDays) {
      return null;
    }
    const dateDifference = DateConverters.getDateDifferenceWithTimezone(paramDate, timezone);
    if (dateDifference !== 0) {
      weekDays = weekDays.map((day) => {
        let newDay = day + dateDifference;
        if (newDay < 0) {
          newDay = 6;
        }
        if (newDay > 6) {
          newDay = 0;
        }
        return newDay;
      });
    }
    return weekDays.sort((a, b) => a - b);
  };

  static getMonthDaysFromParamDate = (paramDate: DateParams, monthDays: number[], timezone: string): number[] => {
    if (!monthDays) {
      return null;
    }
    const dateDifference = DateConverters.getDateDifferenceWithTimezone(paramDate, timezone);
    if (dateDifference !== 0) {
      monthDays = monthDays.map((day) => {
        let newDay = day + dateDifference;
        if (newDay < 1) {
          newDay = 31;
        }
        if (newDay > 31) {
          newDay = 1;
        }
        return newDay;
      });
    }
    return monthDays.sort((a, b) => a - b);
  };

  static getTimeWithTimezone = (paramDate: DateParams, timezone: string): number => {
    let time = paramDate.time;
    if (paramDate.timezone !== timezone) {
      const offsetDifference = tz(timezone).utcOffset() - tz(paramDate.timezone).utcOffset();
      time += offsetDifference;
      if (time > 24 * 60) {
        time -= 24 * 60;
      } else if (time < 0) {
        time += 24 * 60;
      }
    }
    return time;
  };

  static getDateDifferenceWithTimezone = (paramDate: DateParams, timezone: string): number => {
    let time = paramDate.time;
    if (time && paramDate.timezone !== timezone) {
      const offsetDifference = tz(timezone).utcOffset() - tz(paramDate.timezone).utcOffset();
      time += offsetDifference;
      if (time > 24 * 60) {
        return 1;
      } else if (time < 0) {
        return -1;
      }
    }
    return 0;
  };
}
