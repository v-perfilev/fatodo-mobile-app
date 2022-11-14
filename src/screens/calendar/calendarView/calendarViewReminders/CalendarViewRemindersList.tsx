import React, {memo, Suspense} from 'react';
import {Box} from 'native-base';
import CentredSpinner from '../../../../components/surfaces/CentredSpinner';
import FVStack from '../../../../components/boxes/FVStack';
import {CalendarReminder} from '../../../../models/Reminder';
import {LayoutChangeEvent} from 'react-native';
import Separator from '../../../../components/layouts/Separator';

const CalendarViewRemindersItem = React.lazy(() => import('./CalendarViewRemindersItem'));

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
    <Suspense fallback={<CentredSpinner />}>
      <Box px="3" py="2" onLayout={handleLayout}>
        <FVStack space="2">
          {reminders.map((reminder, index) => (
            <Box key={index}>
              {index !== 0 && <Separator />}
              <CalendarViewRemindersItem reminder={reminder} />
            </Box>
          ))}
        </FVStack>
      </Box>
    </Suspense>
  );
};

export default memo(CalendarViewRemindersList);
