import React, {memo} from 'react';
import Animated from 'react-native-reanimated';
import FBox from '../../../../components/boxes/FBox';
import {CalendarMonthParams, CalendarWeekParams} from '../../../../models/Calendar';
import CalendarViewControlMonth from './CalendarViewControlMonth';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import CalendarViewControlWeek from './CalendarViewControlWeek';

type CalendarViewControlListProps = {
  monthParams: CalendarMonthParams[];
  weekParams?: CalendarWeekParams[];
  rate: Animated.SharedValue<number>;
};

const CalendarViewControlList = ({monthParams, weekParams, rate}: CalendarViewControlListProps) => {
  const monthBaseIndex = useAppSelector(CalendarSelectors.monthBaseIndex);
  const weekBaseIndex = useAppSelector(CalendarSelectors.weekBaseIndex);

  return (
    <FBox position="relative" grow>
      {monthParams.map(({monthIndex, freeze}) => (
        <CalendarViewControlMonth
          monthIndex={monthIndex}
          index={monthBaseIndex + monthIndex}
          freeze={freeze}
          rate={rate}
          key={monthIndex}
        />
      ))}
      {weekParams.map(({weekIndex, freeze}) => (
        <CalendarViewControlWeek
          weekIndex={weekIndex}
          index={weekBaseIndex + weekIndex}
          freeze={freeze}
          rate={rate}
          key={weekIndex}
        />
      ))}
    </FBox>
  );
};

const propsAreEqual = (prevProps: CalendarViewControlListProps, nextProps: CalendarViewControlListProps): boolean => {
  return (
    JSON.stringify(prevProps.monthParams) === JSON.stringify(nextProps.monthParams) &&
    JSON.stringify(prevProps.weekParams) === JSON.stringify(nextProps.weekParams)
  );
};

export default memo(CalendarViewControlList, propsAreEqual);
