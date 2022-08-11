export interface CalendarItem {
  year: number;
  month: number;
}

export interface CalendarMonth extends CalendarItem {
  key: string;
}
