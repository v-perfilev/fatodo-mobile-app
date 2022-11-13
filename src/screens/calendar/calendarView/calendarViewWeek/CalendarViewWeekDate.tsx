import React, {memo, useCallback, useEffect, useRef} from 'react';
import {CalendarDate} from '../../../../models/Calendar';
import FHStack from '../../../../components/boxes/FHStack';
import PaperBox from '../../../../components/surfaces/PaperBox';
import {Text, useColorModeValue} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {CalendarActions} from '../../../../store/calendar/calendarActions';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import PressableButton from '../../../../components/controls/PressableButton';
import CalendarViewWeekDateReminders from './CalendarViewWeekDateReminders';
import FBox from '../../../../components/boxes/FBox';

type CalendarViewWeekDateProps = {
  date: CalendarDate;
  freeze: boolean;
  rate?: Animated.SharedValue<number>;
};

const CalendarViewWeekDate = ({date, freeze, rate}: CalendarViewWeekDateProps) => {
  const dispatch = useAppDispatch();
  const isActiveDateSelector = useCallback(CalendarSelectors.makeIsActiveDateSelector(), []);
  const isActive = useAppSelector((state) => isActiveDateSelector(state, date));
  const loaded = useRef<boolean>(false);

  const handlePress = (): void => {
    dispatch(CalendarActions.setDate(date));
  };

  const calcColor = (activeColor: ColorType, currentColor: ColorType, otherColor: ColorType): ColorType => {
    return isActive && date.isActiveMonth ? activeColor : date.isActiveMonth ? currentColor : otherColor;
  };

  const bg = useColorModeValue(
    calcColor('primary.300', 'gray.50', 'gray.200'),
    calcColor('primary.900', 'gray.700', 'gray.800'),
  );
  const color = useColorModeValue(calcColor('white', 'gray.500', 'gray.500'), 'gray.300');

  const style = useAnimatedStyle(() => ({
    width: `${100 / 7}%`,
    height: !rate ? CALENDAR_DATE_HEIGHT : CALENDAR_DATE_HEIGHT * rate.value,
    padding: 4,
  }));

  useEffect(() => {
    !freeze && (loaded.current = true);
  }, [freeze]);

  return (
    <Animated.View style={style}>
      <PressableButton height="100%" onPress={handlePress}>
        <PaperBox height="100%" borderRadius="lg" borderWidth="0" overflow="hidden" bg={bg}>
          <FHStack justifyContent="flex-end">
            <Text fontSize="14" fontWeight="bold" color={color}>
              {date.date}
            </Text>
          </FHStack>
          {(!freeze || loaded) && date.reminders?.length > 0 && (
            <FBox top="23" left="0" right="0" px="1" position="absolute">
              <CalendarViewWeekDateReminders reminders={date.reminders} isActiveDate={isActive} />
            </FBox>
          )}
        </PaperBox>
      </PressableButton>
    </Animated.View>
  );
};

const propsAreEqual = (prevProps: CalendarViewWeekDateProps, nextProps: CalendarViewWeekDateProps): boolean => {
  if (nextProps.freeze) {
    return true;
  } else {
    return JSON.stringify(prevProps.date) === JSON.stringify(nextProps.date) && prevProps.rate === nextProps.rate;
  }
};

export default memo(CalendarViewWeekDate, propsAreEqual);
