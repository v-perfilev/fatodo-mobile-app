import {CalendarReminder} from '../../models/Reminder';

export type CalendarState = {
  monthIndex: number;
  weekIndex: number;
  dayIndex: number;
  dateIndex: number;
  reminders: [string, CalendarReminder[]][];
  loadingKeys: string[];
  loadedKeys: string[];
  shouldLoad: boolean;
};
