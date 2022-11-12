import React, {memo, useCallback, useMemo} from 'react';
import CalendarViewRemindersEmptyStub from './CalendarViewRemindersEmptyStub';
import CalendarViewReminderItem from './CalendarViewReminderItem';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';
import FVStack from '../../../../components/boxes/FVStack';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';

const CalendarViewReminders = () => {
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const dateIndex = useAppSelector(CalendarSelectors.dateIndex);
  const monthKey = useMemo<string>(() => CalendarUtils.buildMonthKey(monthIndex), [monthIndex]);
  const remindersSelector = useCallback(CalendarSelectors.makeRemindersSelector(), []);
  const reminders = useAppSelector((state) => remindersSelector(state, monthKey, dateIndex));
  const showEmptyStub = reminders?.length === 0;
  const showReminders = reminders?.length > 0;

  return (
    <>
      {showEmptyStub && <CalendarViewRemindersEmptyStub />}
      {showReminders && (
        <FVStack grow px="3" py="2">
          {reminders.map((reminder, index) => (
            <CalendarViewReminderItem reminder={reminder} key={index} />
          ))}
        </FVStack>
      )}
    </>
  );
};

export default memo(CalendarViewReminders);
