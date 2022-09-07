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

  let bg = date.isCurrentMonth ? 'gray.100:alpha.50' : 'gray.300:alpha.50';
  bg = isActiveDate && date.isCurrentMonth ? 'primary.500:alpha.40' : bg;
  const dateColor = 'gray.500';

  return (
    <PressableButton m="1" flexGrow="1" flexBasis="1" onPress={handlePress}>
      <PaperBox height="60px" bg={bg} borderWidth="1" borderColor="gray.200:alpha.70">
        <FVStack>
          <FHStack justifyContent="flex-end">
            <Text fontSize="18" fontWeight="bold" color={dateColor}>
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
