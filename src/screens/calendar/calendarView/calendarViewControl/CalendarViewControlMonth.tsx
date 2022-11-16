import React, {memo, useMemo} from 'react';
import Animated, {useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';
import {CalendarWeek} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import FBox from '../../../../components/boxes/FBox';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import CalendarViewWeek from '../calendarViewWeek/CalendarViewWeek';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import {cloneDeep} from 'lodash';

type CalendarViewControlMonthProps = {
  monthIndex: number;
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlMonth = ({monthIndex, rate}: CalendarViewControlMonthProps) => {
  const {weekIndex} = useCalendarContext();
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
    const weeksWithReminders = monthWeeks.map((week) => {
      week.dates = week.dates.map((date) => {
        const monthKey = CalendarUtils.buildMonthKeyByItem(date);
        date.reminders = reminders.get(monthKey)?.filter((r) => new Date(r.date).getDate() === date.date) || [];
        return date;
      });
      return week;
    });
    return cloneDeep(weeksWithReminders);
  }, [reminders]);

  const activeWeek = useDerivedValue(() => {
    let week = 0;
    weeks.forEach((w, index) => w.weekIndex === weekIndex.value && (week = index));
    return week;
  });

  const datesStyle = useAnimatedStyle(() => ({
    height: weeks.length * CALENDAR_DATE_HEIGHT,
    transform: [{translateY: (rate.value - 1) * activeWeek.value * CALENDAR_DATE_HEIGHT}],
  }));

  return (
    <FBox py={1} overflow="hidden">
      <Animated.View style={datesStyle}>
        {weeks.map((week, index) => (
          <CalendarViewWeek dates={week.dates} activeMonthIndex={monthIndex} key={index} />
        ))}
      </Animated.View>
    </FBox>
  );
};

export default memo(CalendarViewControlMonth);
