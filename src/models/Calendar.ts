export type CalendarMode = 'month' | 'week';

export interface CalendarItem {
  year: number;
  month: number;
}

export interface CalendarMonth extends CalendarItem {
  key: string;
}

export interface CalendarDate extends CalendarItem {
  date: number;
  isCurrentMonth?: boolean;
}

export type CalendarWeek = CalendarDate[];
