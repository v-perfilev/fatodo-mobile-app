import React, {memo, Suspense} from 'react';
import CalendarViewWeekDays from '../calendarViewWeek/CalendarViewWeekDays';
import Separator from '../../../../components/layouts/Separator';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';
import CentredSpinner from '../../../../components/surfaces/CentredSpinner';

const CalendarViewControlWeek = React.lazy(() => import('./CalendarViewControlWeek'));

type CalendarViewControlWeekProps = {
  controlIndex: number;
  monthIndex: number;
  weekIndex: number;
  freeze: boolean;
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlWeekWithDays = ({
  controlIndex,
  monthIndex,
  weekIndex,
  freeze,
  rate,
}: CalendarViewControlWeekProps) => {
  const {width} = useWindowDimensions();

  const weekStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width * controlIndex,
    display: rate.value === 0 ? 'flex' : 'none',
    width,
    height: '100%',
  }));

  return (
    <Animated.View style={weekStyle}>
      <CalendarViewWeekDays />
      <Separator />
      <Suspense fallback={<CentredSpinner />}>
        <CalendarViewControlWeek monthIndex={monthIndex} weekIndex={weekIndex} freeze={freeze} />
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
      prevProps.controlIndex === nextProps.controlIndex &&
      prevProps.monthIndex === nextProps.monthIndex
    );
  }
};

export default memo(CalendarViewControlWeekWithDays, propsAreEqual);
