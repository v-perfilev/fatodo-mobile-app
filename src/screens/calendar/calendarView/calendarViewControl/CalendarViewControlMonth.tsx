import React, {memo, useMemo} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {CalendarWeek} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import CalendarViewWeek from '../calendarViewWeek/CalendarViewWeek';
import FBox from '../../../../components/boxes/FBox';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import Separator from '../../../../components/layouts/Separator';
import {useWindowDimensions} from 'react-native';

type CalendarViewControlMonthProps = {
  monthIndex: number;
  baseIndex: number;
  weekIndex: number;
  freeze: boolean;
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlMonth = ({monthIndex, baseIndex, weekIndex, freeze, rate}: CalendarViewControlMonthProps) => {
  const {width} = useWindowDimensions();

  const weeks = useMemo<CalendarWeek[]>(() => {
    const monthDates = CalendarUtils.generateMonthDates(monthIndex);
    const weeks: CalendarWeek[] = [];
    while (monthDates.length) {
      const dates = monthDates.splice(0, 7);
      const weekIndex = CalendarUtils.getWeekIndexByDate(dates[0]);
      weeks.push({dates, weekIndex: weekIndex});
    }
    return weeks;
  }, []);

  const monthStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width * baseIndex,
    display: rate.value === 0 ? 'none' : 'flex',
    width,
  }));

  return (
    <Animated.View style={monthStyle}>
      <CalendarViewWeekDays />
      <Separator />
      <FBox my={1}>
        {weeks.map((week, index) => (
          <CalendarViewWeek
            dates={week.dates}
            isActiveWeek={week.weekIndex === weekIndex}
            freeze={freeze}
            rate={rate}
            key={index}
          />
        ))}
      </FBox>
    </Animated.View>
  );
};

const propsAreEqual = (prevProps: CalendarViewControlMonthProps, nextProps: CalendarViewControlMonthProps): boolean => {
  if (nextProps.freeze) {
    return true;
  } else if (prevProps.freeze && !nextProps.freeze) {
    return false;
  } else {
    return (
      prevProps.monthIndex === nextProps.monthIndex &&
      prevProps.baseIndex === nextProps.baseIndex &&
      prevProps.weekIndex === nextProps.weekIndex
    );
  }
};

export default memo(CalendarViewControlMonth, propsAreEqual);
