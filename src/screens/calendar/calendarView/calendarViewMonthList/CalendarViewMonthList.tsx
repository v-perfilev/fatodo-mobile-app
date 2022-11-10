import React, {memo, ReactElement, useMemo} from 'react';
import FBox from '../../../../components/boxes/FBox';
import CalendarViewControlPan from '../calendarViewControlPan/CalendarViewControlPan';
import Animated from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';
import CalendarViewMonthListItem from './CalendarViewMonthListItem';
import {Box} from 'native-base';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import {CalendarConstants} from '../../../../shared/utils/CalendarUtils';

type CalendarViewMonthListProps = {
  rate: Animated.SharedValue<number>;
};

const MONTH_INDENT = 2;

const CalendarViewMonthList = ({rate}: CalendarViewMonthListProps) => {
  const {monthIndex, setMonthIndex} = useCalendarContext();
  const {width} = useWindowDimensions();

  const control = useMemo<ReactElement>(() => {
    const indexes = ArrayUtils.range(monthIndex - MONTH_INDENT, monthIndex + MONTH_INDENT);
    return (
      <FBox position="relative" grow>
        {indexes.map((index) => (
          <Box position="absolute" width={width} height="100%" top={0} left={index * width} key={index}>
            <CalendarViewMonthListItem monthIndex={index} rate={rate} />
          </Box>
        ))}
      </FBox>
    );
  }, [monthIndex, width]);

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
