import React, {useMemo} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {CalendarWeek} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import FBox from '../../../../components/boxes/FBox';
import {cloneDeep} from 'lodash';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import CalendarViewWeek from '../calendarViewWeek/CalendarViewWeek';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';

type CalendarViewControlMonthProps = {
  monthIndex: number;
  weekIndex: number;
  freeze: boolean;
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlMonth = ({monthIndex, weekIndex, freeze, rate}: CalendarViewControlMonthProps) => {
  const reminders = useAppSelector(CalendarSelectors.reminders);

  const monthWeeks = useMemo<CalendarWeek[]>(() => {
    const monthDates = CalendarUtils.generateMonthDates(monthIndex);
    const weeks: CalendarWeek[] = [];
    while (monthDates.length) {
      const dates = monthDates.splice(0, 7);
      const weekIndex = CalendarUtils.getWeekIndexByDate(dates[0]);
      weeks.push({dates, weekIndex: weekIndex});
    }
    return weeks;
  }, []);

  const weeks = useMemo<CalendarWeek[]>(() => {
    const enrichedMonthWeeks = monthWeeks.map((week) => {
      week.dates = week.dates.map((date) => {
        const monthKey = CalendarUtils.buildMonthKeyByItem(date);
        date.reminders = reminders.get(monthKey)?.filter((r) => new Date(r.date).getDate() === date.date) || [];
        return date;
      });
      return week;
    });
    return cloneDeep(enrichedMonthWeeks);
  }, [reminders]);

  const activeWeek = useMemo<number>(() => {
    let week = 0;
    weeks.forEach((w, index) => w.weekIndex === weekIndex && (week = index));
    return week;
  }, [weekIndex]);

  const datesStyle = useAnimatedStyle(() => ({
    height: weeks.length * CALENDAR_DATE_HEIGHT,
    transform: [{translateY: (rate.value - 1) * activeWeek * CALENDAR_DATE_HEIGHT}],
  }));

  return (
    <FBox py={1} overflow="hidden">
      <Animated.View style={datesStyle}>
        {weeks.map((week, index) => (
          <CalendarViewWeek dates={week.dates} freeze={freeze} key={index} />
        ))}
      </Animated.View>
    </FBox>
  );
};

export default CalendarViewControlMonth;
