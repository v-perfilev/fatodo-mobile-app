import React, {memo, Suspense, useMemo} from 'react';
import {CalendarDate} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import FBox from '../../../../components/boxes/FBox';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import Separator from '../../../../components/layouts/Separator';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';
import {cloneDeep} from 'lodash';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import CentredSpinner from '../../../../components/surfaces/CentredSpinner';

const CalendarViewWeek = React.lazy(() => import('../calendarViewWeek/CalendarViewWeek'));

type CalendarViewControlWeekProps = {
  weekIndex: number;
  baseIndex: number;
  monthIndex: number;
  freeze: boolean;
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlWeek = ({weekIndex, baseIndex, monthIndex, freeze, rate}: CalendarViewControlWeekProps) => {
  const {width} = useWindowDimensions();
  const reminders = useAppSelector(CalendarSelectors.reminders);

  const weekDates = useMemo<CalendarDate[]>(() => {
    return CalendarUtils.generateWeekDates(weekIndex);
  }, []);

  const dates = useMemo<CalendarDate[]>(() => {
    const enrichedWeekDates = weekDates.map((date) => {
      const dateMonthIndex = CalendarUtils.getMonthIndexByItem(date);
      const monthKey = CalendarUtils.buildMonthKeyByItem(date);
      date.isActiveMonth = monthIndex === dateMonthIndex;
      date.reminders = reminders.get(monthKey)?.filter((r) => new Date(r.date).getDate() === date.date);
      return date;
    });
    return cloneDeep(enrichedWeekDates);
  }, [monthIndex, reminders]);

  const weekStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width * baseIndex,
    display: rate.value === 0 ? 'flex' : 'none',
    width,
    height: '100%',
  }));

  return (
    <Animated.View style={weekStyle}>
      <CalendarViewWeekDays />
      <Separator />
      <Suspense fallback={<CentredSpinner />}>
        <FBox py={1}>
          <CalendarViewWeek dates={dates} freeze={freeze} />
        </FBox>
      </Suspense>
    </Animated.View>
  );
};

const propsAreEqual = (prevProps: CalendarViewControlWeekProps, nextProps: CalendarViewControlWeekProps): boolean => {
  if (nextProps.freeze) {
    return true;
  } else {
    return (
      prevProps.weekIndex === nextProps.weekIndex &&
      prevProps.baseIndex === nextProps.baseIndex &&
      prevProps.monthIndex === nextProps.monthIndex
    );
  }
};

export default memo(CalendarViewControlWeek, propsAreEqual);
