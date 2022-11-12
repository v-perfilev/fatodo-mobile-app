import React, {memo, useCallback} from 'react';
import {CalendarDate} from '../../../../models/Calendar';
import FHStack from '../../../../components/boxes/FHStack';
import PaperBox from '../../../../components/surfaces/PaperBox';
import FVStack from '../../../../components/boxes/FVStack';
import {Text, useColorModeValue} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {CALENDAR_DATE_HEIGHT} from '../../../../constants';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {CalendarActions} from '../../../../store/calendar/calendarActions';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import PressableButton from '../../../../components/controls/PressableButton';

type CalendarViewWeekDateProps = {
  date: CalendarDate;
  rate?: Animated.SharedValue<number>;
};

const CalendarViewWeekDate = ({date, rate}: CalendarViewWeekDateProps) => {
  const dispatch = useAppDispatch();
  const isActiveDateSelector = useCallback(CalendarSelectors.makeIsActiveDateSelector(), []);
  const isActive = useAppSelector((state) => isActiveDateSelector(state, date.date));

  const handlePress = (): void => {
    dispatch(CalendarActions.selectDate(date));
  };

  const calcColor = (activeColor: ColorType, currentColor: ColorType, otherColor: ColorType): ColorType => {
    return isActive && date.isCurrentMonth ? activeColor : date.isCurrentMonth ? currentColor : otherColor;
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

  return (
    <Animated.View style={style}>
      <PressableButton height="100%" onPress={handlePress}>
        <PaperBox height="100%" borderRadius="lg" borderWidth="0" bg={bg}>
          <FVStack>
            <FHStack justifyContent="flex-end">
              <Text fontSize="14" fontWeight="bold" color={color}>
                {date.date}
              </Text>
            </FHStack>
          </FVStack>
        </PaperBox>
      </PressableButton>
    </Animated.View>
  );
};

const propsAreEqual = (prevProps: CalendarViewWeekDateProps, nextProps: CalendarViewWeekDateProps): boolean => {
  return prevProps.date.isCurrentMonth === nextProps.date.isCurrentMonth;
};

// TODO fix bug with memorization
// export default memo(CalendarViewWeekDate, propsAreEqual);
export default memo(CalendarViewWeekDate);
