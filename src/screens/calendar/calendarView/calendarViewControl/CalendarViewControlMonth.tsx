import React, {lazy, memo, Suspense, useMemo} from 'react';
import {useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';
import {CalendarEnrichedDate} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import {cloneDeep} from 'lodash';
import {StoreUtils} from '../../../../shared/utils/StoreUtils';
import {CalendarReminder} from '../../../../models/Reminder';
import {useWindowDimensions} from 'react-native';
import AnimatedBox from '../../../../components/animated/AnimatedBox';
import CentredSpinner from '../../../../components/surfaces/CentredSpinner';

const CalendarViewDate = lazy(() => import('../calendarViewDate/CalendarViewDate'));

type CalendarViewControlMonthProps = {
  monthIndex: number;
  controlIndex: number;
};

const CalendarViewControlMonth = ({monthIndex, controlIndex}: CalendarViewControlMonthProps) => {
  const {mode, weekIndex, rate} = useCalendarContext();
  const {width} = useWindowDimensions();
  const reminders = useAppSelector(CalendarSelectors.reminders);

  const monthDates = useMemo<CalendarEnrichedDate[]>(() => {
    return CalendarUtils.generateMonthDates(monthIndex);
  }, []);

  const dates = useMemo<CalendarEnrichedDate[]>(() => {
    const datesWithReminders = monthDates.map((date) => {
      const monthKey = CalendarUtils.buildMonthKeyByItem(date);
      const monthReminders = StoreUtils.getValue(reminders, monthKey, []) as CalendarReminder[];
      date.reminders = monthReminders.filter((r) => new Date(r.date).getDate() === date.date);
      return date;
    });
    return cloneDeep(datesWithReminders);
  }, [reminders]);

  const activeWeek = useDerivedValue(() => {
    const index = dates.filter((d, index) => index % 7 === 0).findIndex((d) => d.weekIndex === weekIndex.value);
    return index > 0 ? index : 0;
  });

  const style = useAnimatedStyle(() => ({
    display: mode.value === 'month' ? 'flex' : 'none',
    transform: [{translateY: (rate.value - 1) * activeWeek.value * CALENDAR_DATE_HEIGHT}],
  }));

  return (
    <AnimatedBox
      style={style}
      position="absolute"
      left={width * controlIndex}
      width={width}
      height="100%"
      flexDirection="row"
      flexWrap="wrap"
      p="1"
    >
      <Suspense fallback={<CentredSpinner />}>
        {dates.map((date) => (
          <CalendarViewDate date={date} activeMonthIndex={monthIndex} key={`month_date_${date.dateIndex}`} />
        ))}
      </Suspense>
    </AnimatedBox>
  );
};

export default memo(CalendarViewControlMonth);
