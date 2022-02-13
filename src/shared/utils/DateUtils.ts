import moment, {Moment} from 'moment';
import {tz} from 'moment-timezone';
import i18n from '../i18n';
import {DateParams} from '../../models/DateParams';

export class DateFormats {
  static timeFormat = 'HH:mm';

  static timeWithDateFormat = 'HH:mm DD.MM.YYYY';

  static timeWithShortenDateFormat = 'HH:mm DD.MM';

  static dateFormat = 'DD.MM';

  static dateWithYearFormat = 'DD.MM.YYYY';

  static monthFormat = 'MMMM';
}

export class DateFormatters {
  static formatZ = (timezone: string): string => tz(timezone).format('Z');

  static formatTimezone = (timezone: string): string => '(GMT' + tz(timezone).format('Z') + ') ' + timezone;

  static formatTime = (date: Date): string => {
    return moment(date).format(DateFormats.timeFormat);
  };

  static formatTimeWithDate = (date: Date): string => {
    return moment(date).format(DateFormats.timeWithDateFormat);
  };

  static formatDate = (date: Date): string => {
    return moment(date).format(DateFormats.dateFormat);
  };

  static formatDateWithYear = (date: Date): string => {
    return moment(date).format(DateFormats.dateWithYearFormat);
  };

  static formatMonth = (date: Date): string => {
    return moment(date).format(DateFormats.monthFormat);
  };

  static formatDependsOnDay = (date: Date): string => {
    const isSameDay = moment(date).isSame(moment(new Date()), 'day');
    const isSameYear = moment(date).isSame(moment(new Date()), 'year');
    if (isSameDay) {
      return moment(date).format(DateFormats.timeFormat);
    } else if (isSameYear) {
      return moment(date).format(DateFormats.timeWithShortenDateFormat);
    }
    return moment(date).format(DateFormats.dateWithYearFormat);
  };
}

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
    let result = {timezone} as DateParams;
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
    if (!paramDate || !paramDate.time) {
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

  static getMomentFromTime = (time: Date): Moment => (time ? moment(time) : moment(new Date()));

  static getTimeFromMoment = (moment: Moment): Date => {
    const date = new Date();
    if (moment) {
      date.setHours(moment.hours());
      date.setMinutes(moment.minutes());
    }
    return date;
  };

  static getDateFromMoment = (moment: Moment): Date => {
    let date = new Date();
    if (moment) {
      date = moment.toDate();
    }
    return date;
  };
}

export class DateUtils {
  static resetLocale = (): void => {
    moment.locale(i18n.language);
  };

  static getTimezone = (): string => tz.guess();

  static getDayOfWeek = (date: Date): number => moment(date).weekday();

  static getDatesInMonth = (date: Date): number => moment(date).daysInMonth();

  static getWeekdayNames = (): string[] => moment.weekdaysShort(true);

  static getWeekdayNumbers = (): number[] => {
    const firstDayOfWeek = moment().startOf('week').day();
    return Array.from({length: 7}, (_, i) => (i + firstDayOfWeek) % 7);
  };

  static getDayNamesByNumbers = (numbers: number[]): string[] => {
    const dayNumbers = DateUtils.getWeekdayNumbers();
    const dayNames = DateUtils.getWeekdayNames();
    const firstDayOfWeek = moment().startOf('week').day();
    const daysBeforeFirstDay: number[] = [];
    const daysAfterFirstDay: number[] = [];
    numbers
      .filter((n) => dayNumbers.includes(n))
      .forEach((n) => {
        if (n < firstDayOfWeek) {
          daysBeforeFirstDay.push(n);
        } else {
          daysAfterFirstDay.push(n);
        }
      });
    const orderedDays = daysAfterFirstDay.concat(daysBeforeFirstDay);
    return orderedDays.map((d) => dayNames[dayNumbers.indexOf(d)]);
  };
}
