import timezone from 'moment-timezone';
import {DateFormatters} from './utils/DateFormatters';

const deprecatedTimeZones = [
  'UCT',
  'PST8PDT',
  'GB',
  'MST7MDT',
  'EST5EDT',
  'W-SU',
  'CST6CDT',
  'HST',
  'MST',
  'Universal',
  'EET',
  'WET',
  'EST',
  'CET',
  'MET',
  'GMT',
  'Etc',
];
const deprecatedTimeZonesRegex = `^${deprecatedTimeZones.join('|^')}`;

export const timezones = timezone.tz
  .names()
  .filter((timezone) => timezone.indexOf('/') > 0)
  .filter((timezone) => timezone.startsWith('A') || !new RegExp(deprecatedTimeZonesRegex).test(timezone))
  .sort((timezoneA, timezoneB) => timezoneA.localeCompare(timezoneB))
  .sort((timezoneA, timezoneB) => (DateFormatters.formatZ(timezoneA) > DateFormatters.formatZ(timezoneB) ? 1 : -1));
