import React, {memo, useMemo} from 'react';
import FBox from '../../../../components/boxes/FBox';
import {CalendarContentParams} from '../../../../models/Calendar';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';
import CalendarViewContentItem from './CalendarViewContentItem';
import Animated, {runOnJS, useDerivedValue} from 'react-native-reanimated';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import {useForceUpdate} from '../../../../shared/hooks/useForceUpdate';

type CalendarViewContentListProps = {
  setHeight: (height: number) => void;
  translate: Animated.SharedValue<number>;
};

const LIST_INDENT = 1;

const CalendarViewContentList = ({setHeight, translate}: CalendarViewContentListProps) => {
  const {dateIndex} = useCalendarContext();
  const forceUpdate = useForceUpdate();

  const dateParams = useMemo<CalendarContentParams[]>(() => {
    return ArrayUtils.range(-LIST_INDENT, LIST_INDENT).map((i) => ({
      dateIndex: dateIndex.value + i,
      freeze: i !== 0,
    }));
  }, [dateIndex.value]);

  useDerivedValue(() => {
    runOnJS(forceUpdate)(dateIndex.value);
  });

  return (
    <FBox position="relative" grow>
      {dateParams.map(({dateIndex, freeze}) => (
        <CalendarViewContentItem
          dateIndex={dateIndex}
          freeze={freeze}
          setHeight={setHeight}
          translate={translate}
          key={`date_${dateIndex}`}
        />
      ))}
    </FBox>
  );
};

export default memo(CalendarViewContentList);
