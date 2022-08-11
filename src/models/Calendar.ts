export interface CalendarItem {
  year: number;
  month: number;
}

export interface CalendarMonth extends CalendarItem {
  key: string;
}

export interface CalendarDate {
  date: number;
  isCurrentMonth: boolean;
}
