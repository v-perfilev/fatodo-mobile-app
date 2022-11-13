import {CalendarReminder} from './Reminder';

export interface CalendarMonth {
  year: number;
  month: number;
}

export interface CalendarDate extends CalendarMonth {
  date: number;
  isActiveMonth?: boolean;
  isActiveWeek?: boolean;
  reminders?: CalendarReminder[];
}

export type CalendarWeek = {
  dates: CalendarDate[];
  weekIndex?: number;
};

export type CalendarMonthParams = {
  monthIndex: number;
  baseIndex: number;
  freeze: boolean;
};

export type CalendarWeekParams = {
  weekIndex: number;
  baseIndex: number;
  freeze: boolean;
};

export type CalendarMode = 'month' | 'week';
