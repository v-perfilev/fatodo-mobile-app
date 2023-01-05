import React, {memo, useCallback, useMemo, useState} from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppSelector} from '../../../../store/store';
import Bullet from '../../../../components/surfaces/Bullet';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {FilterUtils} from '../../../../shared/utils/FilterUtils';
import {CalendarReminder} from '../../../../models/Reminder';
import {Box} from 'native-base';
import {ComparatorUtils} from '../../../../shared/utils/ComparatorUtils';
import {ColorScheme} from '../../../../shared/themes/ThemeFactory';
import {LayoutChangeEvent} from 'react-native';

type CalendarViewDateRemindersProps = {
  reminders: CalendarReminder[];
};

const CalendarViewDateReminders = ({reminders}: CalendarViewDateRemindersProps) => {
  const groupsSelector = useCallback(InfoSelectors.makeGroupsSelector(), []);
  const groupIds = reminders.map((r) => r.parentId).filter(FilterUtils.uniqueFilter);
  const groups = useAppSelector((state) => groupsSelector(state, groupIds));
  const [height, setHeight] = useState<number>(0);

  const reminderColors = useMemo<ColorScheme[]>(
    () =>
      [...reminders]
        .sort(ComparatorUtils.dateComparator)
        .map((reminder) => groups.find((g) => g.id === reminder.parentId))
        .filter(FilterUtils.notUndefinedFilter)
        .map((g) => g.color),
    [reminders, groups],
  );

  const itemHeight = useMemo<number>(() => {
    return Math.max(0, height / 8);
  }, [height]);

  const reminderColorsToShow = reminderColors.slice(0, 3);
  const showDots = reminderColors.length > 3;

  const updateHeight = (e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  };

  return (
    <FVStack flexGrow="1" onLayout={updateHeight}>
      {reminderColorsToShow.map((color, index) => (
        <>
          <Bullet colorScheme={color} size={`${itemHeight}px`} fullWidth key={index} />
          <Box height={`${itemHeight}px`} />
        </>
      ))}
      {showDots && (
        <FHStack space="1" justifyContent="center">
          {Array.from({length: 3}).map((_, index) => (
            <Box width={`${itemHeight}px`} key={index}>
              <Bullet size={`${itemHeight}px`} />
            </Box>
          ))}
        </FHStack>
      )}
    </FVStack>
  );
};

export default memo(CalendarViewDateReminders);
