import React, {memo, useMemo} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {CalendarWeek} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import CalendarViewWeek from '../calendarViewWeek/CalendarViewWeek';
import FBox from '../../../../components/boxes/FBox';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import Separator from '../../../../components/layouts/Separator';
import {useWindowDimensions} from 'react-native';

type CalendarViewControlProps = {
  monthIndex: number;
  index: number;
  freeze: boolean;
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlMonth = ({monthIndex, index, rate}: CalendarViewControlProps) => {
  const {width} = useWindowDimensions();

  const weeks = useMemo<CalendarWeek[]>(() => {
    const monthDates = CalendarUtils.generateMonthDates(monthIndex);
    const weeks: CalendarWeek[] = [];
    while (monthDates.length) {
      const dates = monthDates.splice(0, 7);
      const weekIndex = CalendarUtils.getWeekIndexByDate(dates[0]);
      weeks.push({dates, index: weekIndex});
    }
    return weeks;
  }, []);

  const monthStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width * index,
    display: rate.value === 0 ? 'none' : 'flex',
    width,
  }));

  return (
    <Animated.View style={monthStyle}>
      <CalendarViewWeekDays />
      <Separator />
      <FBox my={1}>
        {weeks.map((week, index) => (
          <CalendarViewWeek dates={week.dates} rate={rate} key={index} />
        ))}
      </FBox>
    </Animated.View>
  );
};

const propsAreEqual = (prevProps: CalendarViewControlProps, nextProps: CalendarViewControlProps): boolean => {
  return nextProps.freeze || (prevProps.monthIndex === nextProps.monthIndex && prevProps.index === nextProps.index);
};

export default memo(CalendarViewControlMonth, propsAreEqual);
