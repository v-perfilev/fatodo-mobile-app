import React, {Dispatch, memo, SetStateAction, useCallback} from 'react';
import {Text, useColorModeValue} from 'native-base';
import PaperBox from '../../../components/surfaces/PaperBox';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import PressableButton from '../../../components/controls/PressableButton';
import {CalendarDate, CalendarMonth} from '../../../models/Calendar';
import CalendarViewDateReminders from './CalendarViewDateReminders';
import {useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {ColorType} from 'native-base/lib/typescript/components/types';

type CalendarViewDateProps = {
  month: CalendarMonth;
  date: CalendarDate;
  selectDate: Dispatch<SetStateAction<CalendarDate>>;
  isActiveDate: boolean;
};

const CalendarViewDate = ({month, date, selectDate, isActiveDate}: CalendarViewDateProps) => {
  const remindersSelector = useCallback(CalendarSelectors.makeRemindersSelector(), []);
  const reminders = useAppSelector((state) => remindersSelector(state, month.key, date.date));

  const handlePress = (): void => {
    date.isCurrentMonth && selectDate(date);
  };

  const calcColor = (activeColor: ColorType, currentColor: ColorType, otherColor: ColorType): ColorType => {
    return isActiveDate && date.isCurrentMonth ? activeColor : date.isCurrentMonth ? currentColor : otherColor;
  };

  const bg = useColorModeValue(
    calcColor('primary.300', 'gray.50', 'gray.200'),
    calcColor('primary.900', 'gray.700', 'gray.800'),
  );
  const color = useColorModeValue(calcColor('white', 'gray.500', 'gray.500'), 'gray.300');

  return (
    <PressableButton m="1" flexGrow="1" flexBasis="1" onPress={handlePress}>
      <PaperBox height="55px" bg={bg} borderRadius="lg" borderWidth="0">
        <FVStack>
          <FHStack justifyContent="flex-end">
            <Text fontSize="14" fontWeight="bold" color={color}>
              {date.date}
            </Text>
          </FHStack>
          <CalendarViewDateReminders reminders={reminders} isActiveDate={isActiveDate} />
        </FVStack>
      </PaperBox>
    </PressableButton>
  );
};

export default memo(CalendarViewDate);
