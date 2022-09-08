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

  let bg = date.isCurrentMonth ? 'gray.50' : 'gray.200';
  bg = isActiveDate && date.isCurrentMonth ? 'primary.50' : bg;
  let border = isActiveDate && date.isCurrentMonth ? 'primary.500' : bg;

  return (
    <PressableButton m="1" flexGrow="1" flexBasis="1" onPress={handlePress}>
      <PaperBox height="60px" bg={bg} borderWidth="2" borderColor={border}>
        <FVStack>
          <FHStack justifyContent="flex-end">
            <Text fontSize="16" fontWeight="bold" color="gray.500">
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
