import {CalendarReminder} from '../../models/Reminder';
import {CalendarMonth} from '../../models/Calendar';

export type CalendarState = {
  activeMonth: CalendarMonth;
  reminders: [string, CalendarReminder[]][];

  // loading
  loading: boolean;
  loadingKeys: string[];
};
