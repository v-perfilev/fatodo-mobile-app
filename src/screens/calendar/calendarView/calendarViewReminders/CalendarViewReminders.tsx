import React, {memo, useCallback, useEffect, useMemo} from 'react';
import CalendarViewRemindersEmptyStub from './CalendarViewRemindersEmptyStub';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';
import {CalendarDate} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';
import CalendarViewRemindersList from './CalendarViewRemindersList';

type CalendarViewRemindersProps = {
  dateIndex: number;
  setHeight: (height: number) => void;
  translate: Animated.SharedValue<number>;
};

const CalendarViewReminders = ({dateIndex, setHeight, translate}: CalendarViewRemindersProps) => {
  const {width} = useWindowDimensions();
  const remindersSelector = useCallback(CalendarSelectors.makeDateRemindersSelector(), []);
  const date = useMemo<CalendarDate>(() => CalendarUtils.getDateByDateIndex(dateIndex), [dateIndex]);
  const reminders = useAppSelector((state) => remindersSelector(state, date));

  useEffect(() => {
    !reminders && setHeight(0);
  }, [reminders]);

  const style = useAnimatedStyle(() => ({
    transform: [{translateY: translate.value}],
    width,
    minHeight: '100%',
  }));

  return (
    <Animated.View style={style}>
      {reminders?.length === 0 ? (
        <CalendarViewRemindersEmptyStub />
      ) : (
        <CalendarViewRemindersList reminders={reminders} setHeight={setHeight} />
      )}
    </Animated.View>
  );
};

export default memo(CalendarViewReminders);
