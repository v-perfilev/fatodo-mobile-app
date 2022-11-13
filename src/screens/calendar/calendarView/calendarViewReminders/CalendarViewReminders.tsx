import React, {memo, useCallback} from 'react';
import CalendarViewRemindersEmptyStub from './CalendarViewRemindersEmptyStub';
import CalendarViewReminderItem from './CalendarViewReminderItem';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';
import FVStack from '../../../../components/boxes/FVStack';

const CalendarViewReminders = () => {
  const remindersSelector = useCallback(CalendarSelectors.makeDateRemindersSelector(), []);
  const date = useAppSelector(CalendarSelectors.date);
  const reminders = useAppSelector((state) => remindersSelector(state, date));
  const showEmptyStub = reminders?.length === 0;
  const showReminders = reminders?.length > 0;

  return (
    <>
      {showEmptyStub && <CalendarViewRemindersEmptyStub />}
      {showReminders && (
        <FVStack grow px="3" py="1">
          {reminders.map((reminder, index) => (
            <CalendarViewReminderItem reminder={reminder} key={index} />
          ))}
        </FVStack>
      )}
    </>
  );
};

export default memo(CalendarViewReminders);
