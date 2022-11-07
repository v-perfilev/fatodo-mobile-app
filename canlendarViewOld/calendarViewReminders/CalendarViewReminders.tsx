import React, {memo, useCallback} from 'react';
import FBox from '../../src/components/boxes/FBox';
import CalendarViewRemindersNotSelectedStub from './CalendarViewRemindersNotSelectedStub';
import CalendarViewRemindersEmptyStub from './CalendarViewRemindersEmptyStub';
import CalendarViewReminderItem from './CalendarViewReminderItem';
import FVStack from '../../src/components/boxes/FVStack';
import {CalendarDate, CalendarMonth} from '../../src/models/Calendar';
import {useAppSelector} from '../../src/store/store';
import CalendarSelectors from '../../src/store/calendar/calendarSelectors';

type CalendarViewRemindersProps = {
  month: CalendarMonth;
  date: CalendarDate;
};

const CalendarViewReminders = ({month, date}: CalendarViewRemindersProps) => {
  const remindersSelector = useCallback(CalendarSelectors.makeRemindersSelector(), []);
  const reminders = useAppSelector((state) => remindersSelector(state, month.key, date?.date));
  const showNotSelectedStub = date === undefined;
  const showEmptyStub = reminders?.length === 0;
  const showReminders = reminders?.length > 0;

  return (
    <FBox>
      {showNotSelectedStub && <CalendarViewRemindersNotSelectedStub />}
      {showEmptyStub && <CalendarViewRemindersEmptyStub />}
      {showReminders && (
        <FVStack px="3">
          {reminders.map((reminder, index) => (
            <CalendarViewReminderItem reminder={reminder} key={index} />
          ))}
        </FVStack>
      )}
    </FBox>
  );
};

export default memo(CalendarViewReminders);
