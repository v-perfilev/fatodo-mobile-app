import {CalendarReminder} from '../../models/Reminder';
import {CalendarMode} from '../../models/Calendar';

export type CalendarState = {
  // Control
  mode: CalendarMode;
  controlIndex: number;
  monthControlIndex: number;
  weekControlIndex: number;
  // Common
  dateIndex: number;
  weekIndex: number;
  monthIndex: number;
  reminders: [string, CalendarReminder[]][];
  loadingKeys: string[];
  loadedKeys: string[];
  shouldLoad: boolean;
};
