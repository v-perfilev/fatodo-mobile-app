import React, {memo, useMemo} from 'react';
import FBox from '../../../../components/boxes/FBox';
import {CalendarContentParams} from '../../../../models/Calendar';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {ArrayUtils} from '../../../../shared/utils/ArrayUtils';
import CalendarViewContentItem from './CalendarViewContentItem';
import Animated from 'react-native-reanimated';

type CalendarViewContentListProps = {
  setHeight: (height: number) => void;
  translate: Animated.SharedValue<number>;
};

const LIST_INDENT = 1;

const CalendarViewContentList = ({setHeight, translate}: CalendarViewContentListProps) => {
  const dateIndex = useAppSelector(CalendarSelectors.dateIndex);

  const dateParams = useMemo<CalendarContentParams[]>(() => {
    return ArrayUtils.range(-LIST_INDENT, LIST_INDENT).map((i) => ({
      dateIndex: dateIndex + i,
      freeze: i !== 0,
    }));
  }, [dateIndex]);

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
