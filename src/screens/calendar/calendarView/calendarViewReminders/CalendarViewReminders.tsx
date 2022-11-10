import React, {memo, useCallback, useMemo} from 'react';
import CalendarViewRemindersEmptyStub from './CalendarViewRemindersEmptyStub';
import CalendarViewReminderItem from './CalendarViewReminderItem';
import {CalendarMonth} from '../../../../models/Calendar';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';
import FVStack from '../../../../components/boxes/FVStack';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';

const CalendarViewReminders = () => {
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const dateIndex = useAppSelector(CalendarSelectors.dateIndex);
  const month = useMemo<CalendarMonth>(() => CalendarUtils.getCalendarDate(monthIndex), [monthIndex]);
  const monthKey = useMemo<string>(() => CalendarUtils.buildMonthKey(month), [month]);
  const remindersSelector = useCallback(CalendarSelectors.makeRemindersSelector(), []);
  const reminders = useAppSelector((state) => remindersSelector(state, monthKey, dateIndex));
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
