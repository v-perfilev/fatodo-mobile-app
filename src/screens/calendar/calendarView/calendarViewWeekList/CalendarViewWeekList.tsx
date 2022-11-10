import React, {memo, ReactElement, useCallback, useMemo} from 'react';
import {Box} from 'native-base';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useWindowDimensions} from 'react-native';
import {CalendarActions} from '../../../../store/calendar/calendarActions';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';
import FBox from '../../../../components/boxes/FBox';
import CalendarViewControlPan from '../calendarViewControlPan/CalendarViewControlPan';
import {CalendarConstants} from '../../../../shared/utils/CalendarUtils';
import CalendarViewWeekListItem from './CalendarViewWeekListItem';

type CalendarViewWeekListProps = {
  indent: number;
};

const CalendarViewWeekList = ({indent}: CalendarViewWeekListProps) => {
  const dispatch = useAppDispatch();
  const weekIndex = useAppSelector(CalendarSelectors.weekIndex);
  const {width} = useWindowDimensions();

  const setWeekIndex = useCallback((index: number) => {
    dispatch(CalendarActions.selectWeek(index));
  }, []);

  const control = useMemo<ReactElement>(() => {
    const indexes = ArrayUtils.range(weekIndex - indent, weekIndex + indent);
    return (
      <FBox position="relative" grow>
        {indexes.map((index) => (
          <Box position="absolute" width={width} height="100%" top={0} left={index * width} key={index}>
            <CalendarViewWeekListItem weekIndex={index} />
          </Box>
        ))}
      </FBox>
    );
  }, [weekIndex, indent, width]);

  return (
    <CalendarViewControlPan
      control={control}
      index={weekIndex}
      setIndex={setWeekIndex}
      length={CalendarConstants.maxWeekIndex}
    />
  );
};

export default memo(CalendarViewWeekList);
