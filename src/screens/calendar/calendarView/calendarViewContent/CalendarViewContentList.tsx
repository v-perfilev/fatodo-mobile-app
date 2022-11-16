import React, {memo, useMemo} from 'react';
import FBox from '../../../../components/boxes/FBox';
import {CalendarContentParams} from '../../../../models/Calendar';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';
import {runOnJS, useDerivedValue} from 'react-native-reanimated';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import {useForceUpdate} from '../../../../shared/hooks/useForceUpdate';
import CalendarViewContentItem from './CalendarViewContentItem';

type CalendarViewContentListProps = {
  setHeight: (height: number) => void;
};

const LIST_INDENT = 1;

const CalendarViewContentList = ({setHeight}: CalendarViewContentListProps) => {
  const {dateIndex} = useCalendarContext();
  const forceUpdate = useForceUpdate();

  const dateParams = useMemo<CalendarContentParams[]>(() => {
    return ArrayUtils.range(-LIST_INDENT, LIST_INDENT).map((i) => ({
      dateIndex: dateIndex.value + i,
    }));
  }, [dateIndex.value]);

  useDerivedValue(() => {
    runOnJS(forceUpdate)(dateIndex.value);
  });

  return (
    <FBox position="relative" grow>
      {dateParams.map(({dateIndex}) => (
        <CalendarViewContentItem dateIndex={dateIndex} setHeight={setHeight} key={`date_${dateIndex}`} />
      ))}
    </FBox>
  );
};

export default memo(CalendarViewContentList);
