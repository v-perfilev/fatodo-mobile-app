import React, {memo, useMemo} from 'react';
import {CalendarEnrichedDate} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {cloneDeep} from 'lodash';
import {StoreUtils} from '../../../../shared/utils/StoreUtils';
import {CalendarReminder} from '../../../../models/Reminder';
import {useAnimatedStyle} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';
import AnimatedBox from '../../../../components/animated/AnimatedBox';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import LazyLoader from '../../../../components/layouts/LazyLoader';
import CalendarViewDate from '../calendarViewDate/CalendarViewDate';

type CalendarViewControlWeekProps = {
  weekIndex: number;
  controlIndex: number;
};

const CalendarViewControlWeek = ({weekIndex, controlIndex}: CalendarViewControlWeekProps) => {
  const {mode} = useCalendarContext();
  const {width} = useWindowDimensions();
  const reminders = useAppSelector(CalendarSelectors.reminders);

  const weekDates = useMemo<CalendarEnrichedDate[]>(() => {
    return CalendarUtils.generateWeekDates(weekIndex);
  }, []);

  const dates = useMemo<CalendarEnrichedDate[]>(() => {
    const datesWithReminders = weekDates.map((date) => {
      const monthKey = CalendarUtils.buildMonthKeyByItem(date);
      const monthReminders = StoreUtils.getValue(reminders, monthKey, []) as CalendarReminder[];
      date.reminders = monthReminders.filter((r) => new Date(r.date).getDate() === date.date);
      return date;
    });
    return cloneDeep(datesWithReminders);
  }, [reminders]);

  const style = useAnimatedStyle(() => ({
    left: width * controlIndex,
    display: mode.value === 'week' ? 'flex' : 'none',
  }));

  return (
    <AnimatedBox style={style} position="absolute" left={width * controlIndex} width={width} height="100%" p="1">
      <LazyLoader flexDirection="row" flexWrap="wrap">
        {dates.map((date) => (
          <CalendarViewDate date={date} key={`week_date_${date.dateIndex}`} />
        ))}
      </LazyLoader>
    </AnimatedBox>
  );
};

export default memo(CalendarViewControlWeek);
