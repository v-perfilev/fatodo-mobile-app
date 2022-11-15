import React, {memo, useMemo} from 'react';
import {CalendarDate} from '../../../../models/Calendar';
import PaperBox from '../../../../components/surfaces/PaperBox';
import {Text, useColorMode, useTheme} from 'native-base';
import PressableButton from '../../../../components/controls/PressableButton';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import Animated, {useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import CalendarViewWeekDateReminders from './CalendarViewWeekDateReminders';

type CalendarViewWeekDateProps = {
  date: CalendarDate;
};

const AnimatedText = Animated.createAnimatedComponent(Text);

const CalendarViewWeekDate = ({date}: CalendarViewWeekDateProps) => {
  const {dateIndex, setDate} = useCalendarContext();
  const theme = useTheme();
  const {colorMode} = useColorMode();

  const white = theme.colors.white;
  const primary300 = theme.colors.primary['300'];
  const primary900 = theme.colors.primary['900'];
  const gray50 = theme.colors.gray['50'];
  const gray200 = theme.colors.gray['200'];
  const gray300 = theme.colors.gray['300'];
  const gray500 = theme.colors.gray['500'];
  const gray700 = theme.colors.gray['700'];
  const gray800 = theme.colors.gray['800'];

  const index = useMemo<number>(() => {
    return CalendarUtils.getDateIndexByDate(date);
  }, [date]);

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

  const isActive = useDerivedValue(() => {
    return dateIndex.value === index;
  });

  const fontStyle = useAnimatedStyle(() => ({
    color: isActive.value ? activeColor : inactiveColor,
  }));

  const bgStyle = useAnimatedStyle(() => ({
    width: '100%',
    height: '100%',
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: isActive.value ? activeDateBg : date.isActiveMonth ? activeMonthBg : inactiveMonthBg,
  }));

  return (
    <PressableButton flexGrow="1" flexBasis="1" margin="1" onPress={handlePress}>
      <PaperBox px="0" py="0" borderRadius="lg" borderWidth="0" overflow="hidden">
        <Animated.View style={bgStyle}>
          <AnimatedText style={fontStyle} fontSize="14" fontWeight="bold" textAlign="right">
            {date.date}
          </AnimatedText>
          <CalendarViewWeekDateReminders reminders={date.reminders} isActiveDate={isActive} />
        </Animated.View>
      </PaperBox>
    </PressableButton>
  );
};

const propsAreEqual = (prevProps: CalendarViewWeekDateProps, nextProps: CalendarViewWeekDateProps): boolean => {
  return JSON.stringify(prevProps.date) === JSON.stringify(nextProps.date);
};

export default memo(CalendarViewWeekDate, propsAreEqual);
