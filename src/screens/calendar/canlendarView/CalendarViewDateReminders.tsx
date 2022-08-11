import React, {memo, useMemo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import Bullet from '../../../components/surfaces/Bullet';
import InfoSelectors from '../../../store/info/infoSelectors';
import {FilterUtils} from '../../../shared/utils/FilterUtils';
import {ColorScheme} from '../../../shared/themes/ThemeFactory';
import {CalendarDate, CalendarMonth} from '../../../models/Calendar';

type CalendarViewDateRemindersProps = {
  month: CalendarMonth;
  date: CalendarDate;
};

const CalendarViewDateReminders = ({month, date}: CalendarViewDateRemindersProps) => {
  const reminders = useAppSelector((state) => CalendarSelectors.reminders(state, month.key));
  const groups = useAppSelector(InfoSelectors.groups);

  const reminderColors = useMemo<ColorScheme[]>(() => {
    const reminderGroups = CalendarUtils.filterRemindersByDate(reminders, date)
      .map((reminder) => groups.get(reminder.parentId))
      .filter(FilterUtils.notUndefinedFilter);
    return reminderGroups.map((g) => g.color);
  }, [reminders, groups]);

  const reminderColorsToShow = reminderColors.slice(0, 3);
  const showDots = reminderColors.length > 3;

  return (
    <FVStack space="1">
      {reminderColorsToShow.map((color, index) => (
        <Bullet color={color} size="4px" fullWidth key={index} />
      ))}
      {showDots && (
        <FHStack space="1" grow justifyContent="center">
          {Array.from({length: 3}).map((_, index) => (
            <Bullet size="5px" key={index} />
          ))}
        </FHStack>
      )}
    </FVStack>
  );
};

export default memo(CalendarViewDateReminders);
