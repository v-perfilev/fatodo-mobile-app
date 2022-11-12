import {CalendarReminder} from '../../models/Reminder';
import {CalendarMode} from '../../models/Calendar';

export type CalendarState = {
  mode: CalendarMode;
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
