import React, {memo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import Bullet from '../../../components/surfaces/Bullet';
import InfoSelectors from '../../../store/info/infoSelectors';
import {FilterUtils} from '../../../shared/utils/FilterUtils';
import {CalendarReminder} from '../../../models/Reminder';

type CalendarViewDateRemindersProps = {
  reminders: CalendarReminder[];
};

const CalendarViewDateReminders = ({reminders}: CalendarViewDateRemindersProps) => {
  const groups = useAppSelector(InfoSelectors.groups);

  const reminderColors = reminders
    .map((reminder) => groups.get(reminder.parentId))
    .filter(FilterUtils.notUndefinedFilter)
    .map((g) => g.color);

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
