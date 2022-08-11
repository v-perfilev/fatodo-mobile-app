import React, {useMemo} from 'react';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import FBox from '../../../../components/boxes/FBox';
import CalendarViewRemindersNotSelectedStub from './CalendarViewRemindersNotSelectedStub';
import CalendarViewRemindersEmptyStub from './CalendarViewRemindersEmptyStub';
import CalendarViewReminderItem from './CalendarViewReminderItem';
import FVStack from '../../../../components/boxes/FVStack';
import {CalendarDate, CalendarMonth} from '../../../../models/Calendar';

type CalendarViewRemindersProps = {
  month: CalendarMonth;
  activeDate: CalendarDate;
};

const CalendarViewReminders = ({month, activeDate}: CalendarViewRemindersProps) => {
  const reminders = useAppSelector((state) => CalendarSelectors.reminders(state, month.key));

  const dateReminders = useMemo(() => {
    return activeDate ? CalendarUtils.filterRemindersByDate(reminders, activeDate) : [];
  }, [activeDate, reminders]);

  const showNotSelectedStub = !activeDate;
  const showEmptyStub = activeDate && dateReminders.length === 0;
  const showReminders = activeDate && dateReminders.length > 0;

  return (
    <FBox>
      {showNotSelectedStub && <CalendarViewRemindersNotSelectedStub />}
      {showEmptyStub && <CalendarViewRemindersEmptyStub />}
      {showReminders && (
        <FVStack px="3">
          {dateReminders.map((reminder, index) => (
            <CalendarViewReminderItem reminder={reminder} key={index} />
          ))}
        </FVStack>
      )}
    </FBox>
  );
};

export default CalendarViewReminders;
