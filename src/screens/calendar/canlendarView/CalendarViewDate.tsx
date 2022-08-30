import React, {Dispatch, memo, SetStateAction} from 'react';
import {Text} from 'native-base';
import PaperBox from '../../../components/surfaces/PaperBox';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import PressableButton from '../../../components/controls/PressableButton';
import {CalendarDate} from '../../../models/Calendar';
import {CalendarReminder} from '../../../models/Reminder';
import CalendarViewDateReminders from './CalendarViewDateReminders';

type CalendarViewDateProps = {
  date: CalendarDate;
  selectDate: Dispatch<SetStateAction<CalendarDate>>;
  isActiveDate: boolean;
  reminders: CalendarReminder[];
};

const CalendarViewDate = ({date, selectDate, isActiveDate, reminders}: CalendarViewDateProps) => {
  const handlePress = (): void => {
    date.isCurrentMonth && selectDate(date);
  };

  let bg = date.isCurrentMonth ? undefined : 'gray.100';
  bg = isActiveDate && date.isCurrentMonth ? 'primary.100:alpha.30' : bg;
  const borderColor = isActiveDate && date.isCurrentMonth ? 'primary.500' : 'gray.200';
  const dateColor = date.isCurrentMonth ? 'gray.500' : 'gray.400';

  return (
    <PressableButton m="1" flexGrow="1" flexBasis="1" onPress={handlePress}>
      <PaperBox height="70px" bg={bg} borderColor={borderColor}>
        <FVStack>
          <FHStack justifyContent="flex-end">
            <Text fontSize="18" fontWeight="extrabold" color={dateColor}>
              {date.date}
            </Text>
          </FHStack>
          <CalendarViewDateReminders reminders={reminders} />
        </FVStack>
      </PaperBox>
    </PressableButton>
  );
};

export default memo(CalendarViewDate);
