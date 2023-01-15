import moment from 'moment';
import {tz} from 'moment-timezone';
import {DateFormat, TimeFormat, UserAccount} from '../../models/User';
import {FilterUtils} from './FilterUtils';
import {DateUtils} from './DateUtils';

export type TimeFormatType = 'FULL';
export type DateFormatType = 'FULL' | 'SHORT' | 'MONTH_YEAR' | 'DEPENDS_ON_DAY';

export class DateFormats {
  static getTimeFormat = (format: TimeFormat): string => {
    switch (format) {
      case 'H12':
        return 'hh:mm A';
      case 'H24':
        return 'HH:mm';
    }
  };

  static getFullDateFormat = (format: DateFormat): string => {
    switch (format) {
      case 'YMD_DASH':
        return 'YYYY-MM-DD';
      case 'MDY_SLASH':
        return 'MM/DD/YYYY';
      case 'DMY_DOT':
        return 'DD.MM.YYYY';
      case 'DMY_DASH':
        return 'DD-MM-YYYY';
      case 'DMY_SLASH':
        return 'DD/MM/YYYY';
    }
  };

  static getShortDateFormat = (format: DateFormat): string => {
    switch (format) {
      case 'YMD_DASH':
        return 'MM-DD';
      case 'MDY_SLASH':
        return 'MM/DD';
      case 'DMY_DOT':
        return 'DD.MM';
      case 'DMY_DASH':
        return 'DD-MM';
      case 'DMY_SLASH':
        return 'DD/MM';
    }
  };

  static getMonthYearFormat = (): string => {
    return 'MMMM YYYY';
  };

  static getDependsOnDayFormat = (date: Date, dateFormat: DateFormat): string => {
    const isSameDay = moment(date).isSame(moment(new Date()), 'day');
    const isSameYear = moment(date).isSame(moment(new Date()), 'year');
    if (isSameDay && isSameYear) {
      return undefined;
    } else if (isSameYear) {
      return DateFormats.getShortDateFormat(dateFormat);
    }
    return DateFormats.getFullDateFormat(dateFormat);
  };
}

export class DateFormatters {
  static formatZ = (timezone: string): string => tz(timezone).format('Z');

  static formatTimezone = (timezone: string): string => '(GMT' + tz(timezone).format('Z') + ') ' + timezone;

  static formatDate = (
    date: Date,
    account?: UserAccount,
    timeFormatType?: TimeFormatType,
    dateFormatType?: DateFormatType,
  ): string => {
    const timeFormat = account?.settings.timeFormat || 'H24';
    const dateFormat = account?.settings.dateFormat || 'YMD_DASH';
    let formatArray: string[] = [];
    if (timeFormatType) {
      formatArray.push(DateFormats.getTimeFormat(timeFormat));
    }
    if (dateFormatType === 'DEPENDS_ON_DAY') {
      const formattedDate = DateFormats.getDependsOnDayFormat(date, dateFormat);
      formattedDate && (formatArray = [formattedDate]);
      DateUtils.resetLocale('en');
    } else if (dateFormatType === 'FULL') {
      formatArray.push(DateFormats.getFullDateFormat(dateFormat));
      DateUtils.resetLocale('en');
    } else if (dateFormatType === 'SHORT') {
      formatArray.push(DateFormats.getShortDateFormat(dateFormat));
      DateUtils.resetLocale('en');
    } else if (dateFormatType === 'MONTH_YEAR') {
      DateUtils.resetLocale();
      formatArray.push(DateFormats.getMonthYearFormat());
    }
    DateUtils.resetLocale();
    const formatter = formatArray.filter(FilterUtils.notUndefinedFilter).join(', ');
    return moment(date).format(formatter);
  };
}
