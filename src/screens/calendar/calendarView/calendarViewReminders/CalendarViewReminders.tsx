import React, {memo, useCallback, useEffect, useMemo} from 'react';
import CalendarViewRemindersEmptyStub from './CalendarViewRemindersEmptyStub';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';
import {CalendarDate} from '../../../../models/Calendar';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import {useAnimatedStyle} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';
import CalendarViewRemindersList from './CalendarViewRemindersList';
import AnimatedBox from '../../../../components/animated/AnimatedBox';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';

type CalendarViewRemindersProps = {
  dateIndex: number;
  setHeight: (height: number) => void;
};

const CalendarViewReminders = ({dateIndex, setHeight}: CalendarViewRemindersProps) => {
  const {translate} = useCalendarContext();
  const {width} = useWindowDimensions();
  const remindersSelector = useCallback(CalendarSelectors.makeDateRemindersSelector(), []);
  const date = useMemo<CalendarDate>(() => CalendarUtils.getDateByDateIndex(dateIndex), [dateIndex]);
  const reminders = useAppSelector((state) => remindersSelector(state, date));

  useEffect(() => {
    !reminders && setHeight(0);
  }, [reminders]);

  const style = useAnimatedStyle(() => ({
    transform: [{translateY: translate.value}],
  }));

  return (
    <AnimatedBox style={style} width={width} minHeight="100%">
      {reminders?.length === 0 ? (
        <CalendarViewRemindersEmptyStub />
      ) : (
        <CalendarViewRemindersList reminders={reminders} setHeight={setHeight} />
      )}
    </AnimatedBox>
  );
};

export default memo(CalendarViewReminders);
