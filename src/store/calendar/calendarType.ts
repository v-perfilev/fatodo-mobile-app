import {CalendarReminder} from '../../models/Reminder';
import {CalendarEnrichedDate} from '../../models/Calendar';

export type CalendarState = {
  date: CalendarEnrichedDate;
  reminders: [string, CalendarReminder[]][];
  loadingKeys: string[];
  loadedKeys: string[];
  shouldLoad: boolean;
};
