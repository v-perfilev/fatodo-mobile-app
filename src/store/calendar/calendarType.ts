import {CalendarReminder} from '../../models/Reminder';

export type CalendarState = {
  monthIndex: number;
  weekIndex: number;
  dayIndex: number;
  dateIndex: number;
  baseIndex: number;
  monthBaseIndex: number;
  weekBaseIndex: number;
  reminders: [string, CalendarReminder[]][];
  loadingKeys: string[];
  loadedKeys: string[];
  shouldLoad: boolean;
};
