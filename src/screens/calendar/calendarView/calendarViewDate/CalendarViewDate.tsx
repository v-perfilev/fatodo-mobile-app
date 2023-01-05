import React, {memo, useEffect, useState} from 'react';
import {CalendarEnrichedDate} from '../../../../models/Calendar';
import {Box, Text, useColorModeValue, useToken} from 'native-base';
import PressableButton from '../../../../components/controls/PressableButton';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import {useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import AnimatedBox from '../../../../components/animated/AnimatedBox';
import CalendarViewDateReminders from './CalendarViewDateReminders';

type CalendarViewDateProps = {
  date: CalendarEnrichedDate;
  activeMonthIndex?: number;
};

const CalendarViewDate = ({date, activeMonthIndex}: CalendarViewDateProps) => {
  const {monthIndex, dateIndex, setDate} = useCalendarContext();
  const [rendered, setRendered] = useState<boolean>();

  const [gray300, gray600, primary500] = useToken('colors', ['gray.300', 'gray.600', 'primary.600']);
  const fontColor = useColorModeValue('gray.600', 'gray.200');

  const handlePress = (): void => {
    setDate(date);
  };

  useEffect(() => {
    setRendered(true);
  }, []);

  const isActiveDate = useDerivedValue(() => {
    return dateIndex.value === date.dateIndex;
  });

  const isActiveMonth = useDerivedValue(() => {
    return date.monthIndex === (activeMonthIndex !== undefined ? activeMonthIndex : monthIndex.value);
  });

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: isActiveMonth.value ? gray300 : gray600,
    opacity: 0.15,
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: primary500,
    borderWidth: isActiveDate.value ? 2.5 : 0,
  }));

  return (
    <Box width={`${100 / 7}%`} height={CALENDAR_DATE_HEIGHT}>
      <PressableButton margin="1" onPress={handlePress}>
        <Box position="relative" width="100%" height="100%" px="1.5" py="0.5" borderRadius="lg" overflow="hidden">
          <AnimatedBox position="absolute" top="0" left="0" bottom="0" right="0" style={bgStyle} />
          <AnimatedBox
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            borderRadius="lg"
            style={borderStyle}
          />
          <Text color={fontColor} fontSize="md" fontWeight="bold" textAlign="right">
            {date.date}
          </Text>
          {rendered && date.reminders.length > 0 && <CalendarViewDateReminders reminders={date.reminders} />}
        </Box>
      </PressableButton>
    </Box>
  );
};

export default memo(CalendarViewDate);
