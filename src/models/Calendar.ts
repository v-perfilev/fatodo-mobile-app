export interface CalendarItem {
  year: number;
  month: number;
}

export interface CalendarRoute extends CalendarItem {
  key: string;
}
