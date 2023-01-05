import React, {memo, useEffect, useState} from 'react';
import {CalendarEnrichedDate} from '../../../../models/Calendar';
import {Box, useColorModeValue, useToken} from 'native-base';
import PressableButton from '../../../../components/controls/PressableButton';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import {useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import AnimatedBox from '../../../../components/animated/AnimatedBox';
import CalendarViewDateReminders from './CalendarViewDateReminders';
import AnimatedText from '../../../../components/animated/AnimatedText';

type CalendarViewDateProps = {
  date: CalendarEnrichedDate;
  activeMonthIndex?: number;
};

const CalendarViewDate = ({date, activeMonthIndex}: CalendarViewDateProps) => {
  const {monthIndex, dateIndex, setDate} = useCalendarContext();
  const [rendered, setRendered] = useState<boolean>();

  const [gray200, gray300, gray400, gray600, primary500] = useToken('colors', [
    'gray.200',
    'gray.300',
    'gray.400',
    'gray.600',
    'primary.600',
  ]);
  const activeFontColor = useColorModeValue(gray600, gray200);
  const inactiveFontColor = useColorModeValue(gray400, gray400);

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

  const fontStyle = useAnimatedStyle(() => ({
    color: isActiveMonth.value ? activeFontColor : inactiveFontColor,
  }));

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
          <AnimatedText fontSize="md" fontWeight="bold" textAlign="right" style={fontStyle}>
            {date.date}
          </AnimatedText>
          {rendered && date.reminders.length > 0 && <CalendarViewDateReminders reminders={date.reminders} />}
        </Box>
      </PressableButton>
    </Box>
  );
};

export default memo(CalendarViewDate);
