import React, {memo} from 'react';
import {Box} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import {CalendarReminder} from '../../../../models/Reminder';
import {LayoutChangeEvent} from 'react-native';
import Separator from '../../../../components/layouts/Separator';
import CalendarViewRemindersItem from './CalendarViewRemindersItem';
import {ComparatorUtils} from '../../../../shared/utils/ComparatorUtils';

type CalendarViewRemindersListProps = {
  reminders: CalendarReminder[];
  setHeight: (height: number) => void;
};

const CalendarViewRemindersList = ({reminders, setHeight}: CalendarViewRemindersListProps) => {
  const handleLayout = (event: LayoutChangeEvent): void => {
    const height = event.nativeEvent.layout.height;
    setHeight(height);
  };

  return (
    <Box px="3" py="2" onLayout={handleLayout}>
      <FVStack space="2">
        {reminders.sort(ComparatorUtils.dateComparator).map((reminder, index) => (
          <Box key={index}>
            {index !== 0 && <Separator />}
            <CalendarViewRemindersItem reminder={reminder} />
          </Box>
        ))}
      </FVStack>
    </Box>
  );
};

export default memo(CalendarViewRemindersList);
