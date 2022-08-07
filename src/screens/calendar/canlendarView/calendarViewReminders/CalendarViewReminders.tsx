import React, {useMemo} from 'react';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import moment from 'moment';
import FBox from '../../../../components/boxes/FBox';
import CalendarViewRemindersNotSelectedStub from './CalendarViewRemindersNotSelectedStub';
import CalendarViewRemindersEmptyStub from './CalendarViewRemindersEmptyStub';
import CalendarViewReminderItem from './CalendarViewReminderItem';
import FVStack from '../../../../components/boxes/FVStack';

type CalendarViewRemindersProps = {
  year: number;
  month: number;
  date: moment.Moment;
};

const CalendarViewReminders = ({year, month, date}: CalendarViewRemindersProps) => {
  const monthKey = CalendarUtils.buildMonthKey(year, month);
  const reminders = useAppSelector((state) => CalendarSelectors.reminders(state, monthKey));
  const dateReminders = useMemo(() => (date ? CalendarUtils.filterByMoment(reminders, date) : []), [date, reminders]);

  const showNotSelectedStub = !date;
  const showEmptyStub = date && dateReminders.length === 0;
  const showReminders = date && dateReminders.length > 0;

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
