import {CalendarReminder} from '../../models/Reminder';

export type CalendarState = {
  reminders: [string, CalendarReminder[]][];
  loadingKeys: string[];
  loadedKeys: string[];
  shouldLoad: boolean;
};
