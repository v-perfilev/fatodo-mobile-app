export interface CalendarMonth {
  year: number;
  month: number;
}

export interface CalendarDate extends CalendarMonth {
  date: number;
  isCurrentMonth?: boolean;
}

export type CalendarWeek = CalendarDate[];
