import React, {memo, useCallback, useMemo} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {CalendarWeek} from '../../../../models/Calendar';
import CalendarViewDate from './CalendarViewWeekDate';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import FBox from '../../../../components/boxes/FBox';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';

type CalendarViewWeekProps = {
  week: CalendarWeek;
  rate?: Animated.SharedValue<number>;
};

const CalendarViewWeek = ({week, rate}: CalendarViewWeekProps) => {
  const weekIndex = useMemo<number>(() => CalendarUtils.getWeekIndexByDate(week[0]), []);
  const isActiveWeekSelector = useCallback(CalendarSelectors.makeIsActiveWeekSelector(), []);
  const isActiveWeek = useAppSelector((state) => isActiveWeekSelector(state, weekIndex));

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
        {week.map((weekDate, index) => (
          <CalendarViewDate date={weekDate} key={index} />
        ))}
      </FBox>
    </Animated.View>
  );
};

export default memo(CalendarViewWeek);
