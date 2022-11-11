import React, {memo, useCallback, useMemo} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {CalendarDate} from '../../../../models/Calendar';
import CalendarViewDate from './CalendarViewWeekDate';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import FBox from '../../../../components/boxes/FBox';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';

type CalendarViewWeekProps = {
  dates: CalendarDate[];
  rate?: Animated.SharedValue<number>;
};

const CalendarViewWeek = ({dates, rate}: CalendarViewWeekProps) => {
  const weekIndex = useMemo<number>(() => CalendarUtils.getWeekIndexByDate(dates[0]), []);
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
        {dates.map((date, index) => (
          <CalendarViewDate date={date} rate={isActiveWeek ? undefined : rate} key={index} />
        ))}
      </FBox>
    </Animated.View>
  );
};

export default memo(CalendarViewWeek);
