export interface CalendarMonth {
  year: number;
  month: number;
}

export interface CalendarDate extends CalendarMonth {
  date: number;
  isCurrentMonth?: boolean;
}

export type CalendarWeek = {
  dates: CalendarDate[];
  index?: number;
};

export type CalendarMonthParams = {
  monthIndex: number;
  freeze: boolean;
};

export type CalendarWeekParams = {
  weekIndex: number;
  freeze: boolean;
};
