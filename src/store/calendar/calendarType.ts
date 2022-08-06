import {CalendarReminder} from '../../models/Reminder';

export type CalendarState = {
  reminders: [string, CalendarReminder[]][];
  loading: boolean;
};
