import moment from 'moment';

export class CalendarUtils {
  public static getMonthMoment = (year: number, month: number): moment.Moment => {
    return moment({year, month, d: 10});
  };

  public static getOnePageMoments = (year: number, month: number): moment.Moment[] => {
    const monthMoment = moment({year, month, d: 10});
    const firstDateMoment = monthMoment.clone().startOf('month');
    const firstDateDay = firstDateMoment.day();
    const lastDateMoment = monthMoment.clone().endOf('month');
    const lastDateDay = lastDateMoment.day();
    const daysInMonth = monthMoment.daysInMonth();

    const dates: moment.Moment[] = [];
    for (let i = 1; i < firstDateDay; i++) {
      const date = firstDateMoment.clone().subtract(firstDateDay - i, 'days');
      dates.push(date);
    }

    for (let i = 0; i < daysInMonth; i++) {
      const date = firstDateMoment.clone().add(i, 'day');
      dates.push(date);
    }

    if (lastDateDay !== 0) {
      for (let i = lastDateDay + 1; i <= 7; i++) {
        const date = lastDateMoment.clone().add(i - lastDateDay, 'days');
        dates.push(date);
      }
    }

    return dates;
  };

  public static splitMonthInWeeks = (dates: moment.Moment[]): moment.Moment[][] => {
    const weekDates: moment.Moment[][] = [];
    dates.forEach((d, i) => {
      const weekIndex = Math.floor(i / 7);
      if (!weekDates[weekIndex]) {
        weekDates[weekIndex] = [];
      }
      weekDates[weekIndex].push(d);
    });
    return weekDates;
  };
}
