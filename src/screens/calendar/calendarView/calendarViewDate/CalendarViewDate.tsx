import React, {memo, useEffect, useMemo, useState} from 'react';
import {CalendarEnrichedDate} from '../../../../models/Calendar';
import {Box, useColorMode, useTheme} from 'native-base';
import PressableButton from '../../../../components/controls/PressableButton';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import {useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import AnimatedBox from '../../../../components/animated/AnimatedBox';
import AnimatedText from '../../../../components/animated/AnimatedText';
import CalendarViewDateReminders from './CalendarViewDateReminders';

type CalendarViewDateProps = {
  date: CalendarEnrichedDate;
  activeMonthIndex?: number;
};

const CalendarViewDate = ({date, activeMonthIndex}: CalendarViewDateProps) => {
  const {monthIndex, dateIndex, setDate} = useCalendarContext();
  const theme = useTheme();
  const {colorMode} = useColorMode();
  const [rendered, setRendered] = useState<boolean>();

  const white = theme.colors.white;
  const primary300 = theme.colors.primary['300'];
  const primary900 = theme.colors.primary['900'];
  const gray50 = theme.colors.gray['50'];
  const gray200 = theme.colors.gray['200'];
  const gray300 = theme.colors.gray['300'];
  const gray500 = theme.colors.gray['500'];
  const gray700 = theme.colors.gray['700'];
  const gray800 = theme.colors.gray['800'];

  const handlePress = (): void => {
    setDate(date);
  };

  const {activeColor, inactiveColor} = useMemo(() => {
    return colorMode === 'light'
      ? {activeColor: white, inactiveColor: gray500}
      : {activeColor: gray300, inactiveColor: gray300};
  }, [colorMode]);

  const {activeDateBg, activeMonthBg, inactiveMonthBg} = useMemo(() => {
    return colorMode === 'light'
      ? {activeDateBg: primary300, activeMonthBg: gray50, inactiveMonthBg: gray200}
      : {activeDateBg: primary900, activeMonthBg: gray700, inactiveMonthBg: gray800};
  }, [colorMode]);

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
    color: isActiveDate.value ? activeColor : inactiveColor,
  }));

  const bgStyle = useAnimatedStyle(() => ({
    width: '100%',
    height: '100%',
    backgroundColor: isActiveDate.value ? activeDateBg : isActiveMonth.value ? activeMonthBg : inactiveMonthBg,
  }));

  return (
    <Box width={`${100 / 7}%`} height={CALENDAR_DATE_HEIGHT}>
      <PressableButton margin="1" onPress={handlePress}>
        <AnimatedBox style={bgStyle} px="1" py="0.5" borderRadius="lg" overflow="hidden">
          <AnimatedText style={fontStyle} fontSize="md" fontWeight="bold" textAlign="right">
            {date.date}
          </AnimatedText>
          {rendered && date.reminders.length > 0 && (
            <CalendarViewDateReminders reminders={date.reminders} isActiveDate={isActiveDate} />
          )}
        </AnimatedBox>
      </PressableButton>
    </Box>
  );
};

export default memo(CalendarViewDate);
