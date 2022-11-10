import React, {memo, useCallback, useMemo} from 'react';
import CalendarViewRemindersEmptyStub from './CalendarViewRemindersEmptyStub';
import CalendarViewReminderItem from './CalendarViewReminderItem';
import {CalendarMonth} from '../../../../models/Calendar';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';
import FVStack from '../../../../components/boxes/FVStack';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';

const CalendarViewReminders = () => {
  const {date} = useCalendarContext();
  const month = useMemo<CalendarMonth>(() => CalendarUtils.getMonthByDate(date), [date.year, date.month]);
  const monthKey = useMemo<string>(() => CalendarUtils.buildMonthKey(month), [month]);
  const remindersSelector = useCallback(CalendarSelectors.makeRemindersSelector(), []);
  const reminders = useAppSelector((state) => remindersSelector(state, monthKey, date?.date));
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
