import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {CalendarDate} from '../../../../models/Calendar';
import PaperBox from '../../../../components/surfaces/PaperBox';
import {Text, useColorMode} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {CalendarActions} from '../../../../store/calendar/calendarActions';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import PressableButton from '../../../../components/controls/PressableButton';
import CalendarViewWeekDateReminders from './CalendarViewWeekDateReminders';

type CalendarViewWeekDateProps = {
  date: CalendarDate;
  freeze: boolean;
};

const CalendarViewWeekDate = ({date, freeze}: CalendarViewWeekDateProps) => {
  const dispatch = useAppDispatch();
  const {colorMode} = useColorMode();
  const isActiveDateSelector = useCallback(CalendarSelectors.makeIsActiveDateSelector(), []);
  const isActive = useAppSelector((state) => isActiveDateSelector(state, date));
  const loaded = useRef<boolean>(false);

  const handlePress = (): void => {
    dispatch(CalendarActions.setDate(date));
  };

  const calcColor = (activeColor: ColorType, currentColor: ColorType, otherColor: ColorType): ColorType => {
    if (isActive && date.isActiveMonth) {
      return activeColor;
    } else if (date.isActiveMonth) {
      return currentColor;
    } else {
      return otherColor;
    }
  };

  const color = useMemo<ColorType>(() => {
    return colorMode === 'light' ? calcColor('white', 'gray.500', 'gray.500') : 'gray.300';
  }, [colorMode, isActive, date.isActiveMonth]);

  const bg = useMemo<ColorType>(() => {
    return colorMode === 'light'
      ? calcColor('primary.300', 'gray.50', 'gray.200')
      : calcColor('primary.900', 'gray.700', 'gray.800');
  }, [colorMode, isActive, date.isActiveMonth]);
  //

  useEffect(() => {
    !freeze && (loaded.current = true);
  }, [freeze]);

  return (
    <PressableButton flexGrow="1" flexBasis="1" margin="1" onPress={handlePress}>
      <PaperBox height="100%" borderRadius="lg" borderWidth="0" overflow="hidden" bg={bg}>
        <Text fontSize="14" fontWeight="bold" color={color} textAlign="right">
          {date.date}
        </Text>
        {(!freeze || loaded) && date.reminders?.length > 0 && (
          <CalendarViewWeekDateReminders reminders={date.reminders} isActiveDate={isActive} />
        )}
      </PaperBox>
    </PressableButton>
  );
};

const propsAreEqual = (prevProps: CalendarViewWeekDateProps, nextProps: CalendarViewWeekDateProps): boolean => {
  if (nextProps.freeze) {
    return true;
  } else {
    return JSON.stringify(prevProps.date) === JSON.stringify(nextProps.date);
  }
};

export default memo(CalendarViewWeekDate, propsAreEqual);
