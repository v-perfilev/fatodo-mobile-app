import React, {useCallback} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import Bullet from '../../../components/surfaces/Bullet';
import InfoSelectors from '../../../store/info/infoSelectors';
import {FilterUtils} from '../../../shared/utils/FilterUtils';
import {CalendarReminder} from '../../../models/Reminder';

type CalendarViewDateRemindersProps = {
  reminders: CalendarReminder[];
  isActiveDate?: boolean;
};

const CalendarViewDateReminders = ({reminders, isActiveDate}: CalendarViewDateRemindersProps) => {
  const groupsSelector = useCallback(InfoSelectors.makeGroupsSelector(), []);
  const groupIds = reminders.map((r) => r.parentId).filter(FilterUtils.uniqueFilter);
  const groups = useAppSelector((state) => groupsSelector(state, groupIds));

  const reminderColors = reminders
    .map((reminder) => groups.find((g) => g.id === reminder.parentId))
    .filter(FilterUtils.notUndefinedFilter)
    .map((g) => g.color);

  const reminderColorsToShow = reminderColors.slice(0, 3);
  const showDots = reminderColors.length > 3;

  return (
    <FVStack space="3.5px">
      {reminderColorsToShow.map((color, index) => (
        <Bullet inverted={isActiveDate} color={color} size="4px" fullWidth key={index} />
      ))}
      {showDots && (
        <FHStack space="5px" grow justifyContent="center">
          {Array.from({length: 3}).map((_, index) => (
            <Bullet inverted={isActiveDate} size="5px" key={index} />
          ))}
        </FHStack>
      )}
    </FVStack>
  );
};

export default CalendarViewDateReminders;
