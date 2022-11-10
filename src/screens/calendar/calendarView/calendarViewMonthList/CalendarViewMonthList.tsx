import React, {memo, ReactElement, useCallback, useMemo} from 'react';
import FBox from '../../../../components/boxes/FBox';
import CalendarViewControlPan from '../calendarViewControlPan/CalendarViewControlPan';
import Animated from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';
import CalendarViewMonthListItem from './CalendarViewMonthListItem';
import {Box} from 'native-base';
import {CalendarConstants} from '../../../../shared/utils/CalendarUtils';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {CalendarActions} from '../../../../store/calendar/calendarActions';

type CalendarViewMonthListProps = {
  indent: number;
  rate: Animated.SharedValue<number>;
};

const CalendarViewMonthList = ({indent, rate}: CalendarViewMonthListProps) => {
  const dispatch = useAppDispatch();
  const monthIndex = useAppSelector(CalendarSelectors.monthIndex);
  const {width} = useWindowDimensions();

  const setMonthIndex = useCallback((index: number) => {
    dispatch(CalendarActions.selectMonth(index));
  }, []);

  const control = useMemo<ReactElement>(() => {
    const indexes = ArrayUtils.range(monthIndex - indent, monthIndex + indent);
    return (
      <FBox position="relative" grow>
        {indexes.map((index) => (
          <Box position="absolute" width={width} height="100%" top={0} left={index * width} key={index}>
            <CalendarViewMonthListItem monthIndex={index} rate={rate} />
          </Box>
        ))}
      </FBox>
    );
  }, [monthIndex, indent, width]);

  return (
    <CalendarViewControlPan
      control={control}
      index={monthIndex}
      setIndex={setMonthIndex}
      length={CalendarConstants.maxMonthIndex}
    />
  );
};

export default memo(CalendarViewMonthList);
