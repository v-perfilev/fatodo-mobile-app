import React, {memo, useMemo} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {CalendarDate} from '../../../../models/Calendar';
import CalendarViewDate from './CalendarViewWeekDate';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import FBox from '../../../../components/boxes/FBox';

type CalendarViewWeekProps = {
  dates: CalendarDate[];
  isActiveWeek?: boolean;
  freeze?: boolean;
  rate?: Animated.SharedValue<number>;
};

const CalendarViewWeek = ({dates, isActiveWeek, rate}: CalendarViewWeekProps) => {
  const dateRate = useMemo<Animated.SharedValue<number>>(() => {
    return !isActiveWeek ? rate : undefined;
  }, [isActiveWeek]);

  const style = useAnimatedStyle(() => ({
    width: '100%',
    height: isActiveWeek || !rate ? CALENDAR_DATE_HEIGHT : CALENDAR_DATE_HEIGHT * rate.value,
    maxHeight: CALENDAR_DATE_HEIGHT,
    opacity: isActiveWeek || !rate ? 1 : rate.value,
    overflow: 'hidden',
  }));

  return (
    <Animated.View style={style}>
      <FBox flexDirection="row" px={1}>
        {dates.map((date, index) => (
          <CalendarViewDate date={date} rate={dateRate} key={index} />
        ))}
      </FBox>
    </Animated.View>
  );
};

const propsAreEqual = (prevProps: CalendarViewWeekProps, nextProps: CalendarViewWeekProps): boolean => {
  if (nextProps.freeze) {
    return true;
  } else if (prevProps.freeze && !nextProps.freeze) {
    return false;
  } else {
    return (
      JSON.stringify(prevProps.dates) === JSON.stringify(nextProps.dates) &&
      prevProps.isActiveWeek === nextProps.isActiveWeek
    );
  }
};

export default memo(CalendarViewWeek, propsAreEqual);
