import React, {memo, useCallback} from 'react';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import CalendarViewContentList from './CalendarViewContentList';
import CalendarViewHorizontalPan from '../calendarViewPan/CalendarViewHorizontalPan';
import Animated from 'react-native-reanimated';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';

type CalendarViewContentProps = {
  setHeight: (height: number) => void;
  translate: Animated.SharedValue<number>;
};

const CalendarViewContent = ({setHeight, translate}: CalendarViewContentProps) => {
  const {contentPanRef, dateIndex, canScrollContentLeft, canScrollContentRight, setDate} = useCalendarContext();

  const setDateIndex = useCallback((index: number) => {
    const date = CalendarUtils.getDateByDateIndex(index);
    setDate(date);
  }, []);

  return (
    <CalendarViewHorizontalPan
      index={dateIndex}
      setIndex={setDateIndex}
      canScrollLeft={canScrollContentLeft}
      canScrollRight={canScrollContentRight}
      horizontalPanRef={contentPanRef}
    >
      <CalendarViewContentList setHeight={setHeight} translate={translate} />
    </CalendarViewHorizontalPan>
  );
};

export default memo(CalendarViewContent);
