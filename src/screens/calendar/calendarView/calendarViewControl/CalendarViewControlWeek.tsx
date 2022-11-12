import React, {memo, useMemo} from 'react';
import {CalendarDate} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import CalendarViewWeek from '../calendarViewWeek/CalendarViewWeek';
import FBox from '../../../../components/boxes/FBox';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import Separator from '../../../../components/layouts/Separator';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';
import {cloneDeep} from 'lodash';

type CalendarViewControlWeekProps = {
  weekIndex: number;
  baseIndex: number;
  monthIndex: number;
  freeze: boolean;
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlWeek = ({weekIndex, baseIndex, monthIndex, freeze, rate}: CalendarViewControlWeekProps) => {
  const {width} = useWindowDimensions();

  const weekDates = useMemo<CalendarDate[]>(() => {
    return CalendarUtils.generateWeekDates(weekIndex);
  }, []);

  const dates = useMemo<CalendarDate[]>(() => {
    const enrichedWeekDates = weekDates.map((date) => {
      const dateMonthIndex = CalendarUtils.getMonthIndexByDate(date);
      date.isActiveMonth = monthIndex === dateMonthIndex;
      return date;
    });
    return cloneDeep(enrichedWeekDates);
  }, [monthIndex]);

  const weekStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width * baseIndex,
    display: rate.value === 0 ? 'flex' : 'none',
    width,
  }));

  return (
    <Animated.View style={weekStyle}>
      <CalendarViewWeekDays />
      <Separator />
      <FBox my={1}>
        <CalendarViewWeek dates={dates} freeze={freeze} />
      </FBox>
    </Animated.View>
  );
};

const propsAreEqual = (prevProps: CalendarViewControlWeekProps, nextProps: CalendarViewControlWeekProps): boolean => {
  if (nextProps.freeze) {
    return true;
  } else if (prevProps.freeze && !nextProps.freeze) {
    return false;
  } else {
    return (
      prevProps.weekIndex === nextProps.weekIndex &&
      prevProps.baseIndex === nextProps.baseIndex &&
      prevProps.monthIndex === nextProps.monthIndex
    );
  }
};

export default memo(CalendarViewControlWeek, propsAreEqual);
