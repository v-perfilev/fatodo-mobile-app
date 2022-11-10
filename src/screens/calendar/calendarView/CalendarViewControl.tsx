import React, {memo, useMemo, useState} from 'react';
import Animated, {useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';
import CalendarViewTitle from './CalendarViewTitle';
import CalendarViewMonthList from './calendarViewMonthList/CalendarViewMonthList';
import CalendarViewWeekList from './calendarViewWeekList/CalendarViewWeekList';

type CalendarViewControlProps = {
  rate: Animated.SharedValue<number>;
};

type CalendarViewControlMode = 'month' | 'week';

const CalendarViewControl = ({rate}: CalendarViewControlProps) => {
  const [mode, setMode] = useState<CalendarViewControlMode>('month');

  const monthListIndent = useMemo<number>(() => (mode === 'month' ? 2 : 0), [mode]);
  const weekListIndent = useMemo<number>(() => (mode === 'week' ? 2 : 0), [mode]);

  // TODO DELETE IF FREEZE
  useDerivedValue(() => {
    if (rate.value === 0 && mode !== 'week') {
      // runOnJS(setMode)('week');
    } else if (rate.value === 1 && mode !== 'month') {
      // runOnJS(setMode)('month');
    }
  });

  const monthListStyle = useAnimatedStyle(() => ({
    display: rate.value === 0 ? 'none' : 'flex',
  }));

  const weekListStyle = useAnimatedStyle(() => ({
    display: rate.value === 0 ? 'flex' : 'none',
  }));

  return (
    <>
      <CalendarViewTitle />
      <Animated.View style={monthListStyle}>
        <CalendarViewMonthList indent={monthListIndent} rate={rate} />
      </Animated.View>
      <Animated.View style={weekListStyle}>
        <CalendarViewWeekList indent={weekListIndent} />
      </Animated.View>
    </>
  );
};

export default memo(CalendarViewControl);
