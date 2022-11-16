import {CalendarReminder} from './Reminder';

export interface CalendarMonth {
  year: number;
  month: number;
}

export interface CalendarDate extends CalendarMonth {
  date: number;
}

export interface CalendarEnrichedDate extends CalendarMonth {
  date: number;
  monthIndex: number;
  weekIndex: number;
  dateIndex: number;
  reminders?: CalendarReminder[];
}

export type CalendarWeek = {
  dates: CalendarEnrichedDate[];
  weekIndex: number;
};

export type CalendarMonthParams = {
  monthIndex: number;
  controlIndex: number;
};

export type CalendarWeekParams = {
  weekIndex: number;
  controlIndex: number;
};

export type CalendarContentParams = {
  dateIndex: number;
  freeze: boolean;
};

export type CalendarMode = 'month' | 'week';
