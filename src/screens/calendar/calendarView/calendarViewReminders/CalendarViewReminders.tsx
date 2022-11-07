import React, {memo, useCallback, useMemo} from 'react';
import CalendarViewRemindersEmptyStub from './CalendarViewRemindersEmptyStub';
import CalendarViewReminderItem from './CalendarViewReminderItem';
import {CalendarDate, CalendarMonth} from '../../../../models/Calendar';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';
import FVStack from '../../../../components/boxes/FVStack';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';

type CalendarViewRemindersProps = {
  date: CalendarDate;
};

const CalendarViewReminders = ({date}: CalendarViewRemindersProps) => {
  const month = useMemo<CalendarMonth>(() => CalendarUtils.generateDateCalendarMonth(date), [date.year, date.month]);
  const remindersSelector = useCallback(CalendarSelectors.makeRemindersSelector(), []);
  const reminders = useAppSelector((state) => remindersSelector(state, month.key, date?.date));
  const showEmptyStub = reminders?.length === 0;
  const showReminders = reminders?.length > 0;

  return (
    <>
      {showEmptyStub && <CalendarViewRemindersEmptyStub />}
      {showReminders && (
        <FVStack px="3">
          {reminders.map((reminder, index) => (
            <CalendarViewReminderItem reminder={reminder} key={index} />
          ))}
        </FVStack>
      )}
    </>
  );
};

export default memo(CalendarViewReminders);
