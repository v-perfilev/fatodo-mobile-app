import React, {memo, useMemo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import Bullet from '../../../components/surfaces/Bullet';
import InfoSelectors from '../../../store/info/infoSelectors';
import {FilterUtils} from '../../../shared/utils/FilterUtils';
import {ColorScheme} from '../../../shared/themes/ThemeFactory';
import {CalendarReminder} from '../../../models/Reminder';

type CalendarViewDateRemindersProps = {
  reminders: CalendarReminder[];
};

const CalendarViewDateReminders = ({reminders}: CalendarViewDateRemindersProps) => {
  const groups = useAppSelector(InfoSelectors.groups);

  const reminderColors = useMemo<ColorScheme[]>(() => {
    const reminderGroups = reminders
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

const arePropsEqual = (
  prevProps: CalendarViewDateRemindersProps,
  nextProps: CalendarViewDateRemindersProps,
): boolean => {
  return JSON.stringify(prevProps.reminders) === JSON.stringify(nextProps.reminders);
};

export default memo(CalendarViewDateReminders, arePropsEqual);
