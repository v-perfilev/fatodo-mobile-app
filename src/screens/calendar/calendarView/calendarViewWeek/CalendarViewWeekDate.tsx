import React, {Dispatch, memo, SetStateAction} from 'react';
import {CalendarDate} from '../../../../models/Calendar';
import FHStack from '../../../../components/boxes/FHStack';
import PressableButton from '../../../../components/controls/PressableButton';
import PaperBox from '../../../../components/surfaces/PaperBox';
import FVStack from '../../../../components/boxes/FVStack';
import {Text, useColorModeValue} from 'native-base';
import FBox from '../../../../components/boxes/FBox';
import {ColorType} from 'native-base/lib/typescript/components/types';

type CalendarViewWeekDateProps = {
  date: CalendarDate;
  isActiveDate: boolean;
  setActiveDate: Dispatch<SetStateAction<CalendarDate>>;
};

const CalendarViewWeekDate = ({date, isActiveDate, setActiveDate}: CalendarViewWeekDateProps) => {
  const handlePress = (): void => {
    date.isCurrentMonth && setActiveDate(date);
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
    <FBox p="1">
      <PressableButton onPress={handlePress}>
        <PaperBox h="100%" bg={bg} borderRadius="lg" borderWidth="0">
          <FVStack>
            <FHStack justifyContent="flex-end">
              <Text fontSize="14" fontWeight="bold" color={color}>
                {date.date}
              </Text>
            </FHStack>
          </FVStack>
        </PaperBox>
      </PressableButton>
    </FBox>
  );
};

export default memo(CalendarViewWeekDate);
