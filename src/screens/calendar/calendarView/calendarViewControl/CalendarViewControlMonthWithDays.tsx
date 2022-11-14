import React, {memo, Suspense} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import Separator from '../../../../components/layouts/Separator';
import {useWindowDimensions} from 'react-native';
import CentredSpinner from '../../../../components/surfaces/CentredSpinner';
// import CalendarViewControlMonth from './CalendarViewControlMonth';

const CalendarViewControlMonth = React.lazy(() => import('./CalendarViewControlMonth'));

type CalendarViewControlMonthWithDaysProps = {
  monthIndex: number;
  baseIndex: number;
  weekIndex: number;
  freeze: boolean;
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlMonthWithDays = ({
  monthIndex,
  baseIndex,
  weekIndex,
  freeze,
  rate,
}: CalendarViewControlMonthWithDaysProps) => {
  const {width} = useWindowDimensions();

  const monthStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width * baseIndex,
    display: rate.value === 0 ? 'none' : 'flex',
    width,
    height: '100%',
  }));

  return (
    <Animated.View style={monthStyle}>
      <CalendarViewWeekDays />
      <Separator />
      <Suspense fallback={<CentredSpinner />}>
        <CalendarViewControlMonth monthIndex={monthIndex} weekIndex={weekIndex} freeze={freeze} rate={rate} />
      </Suspense>
    </Animated.View>
  );
};

const propsAreEqual = (
  prevProps: CalendarViewControlMonthWithDaysProps,
  nextProps: CalendarViewControlMonthWithDaysProps,
): boolean => {
  if (nextProps.freeze) {
    return true;
  } else {
    return (
      prevProps.monthIndex === nextProps.monthIndex &&
      prevProps.baseIndex === nextProps.baseIndex &&
      prevProps.weekIndex === nextProps.weekIndex
    );
  }
};

export default memo(CalendarViewControlMonthWithDays, propsAreEqual);
