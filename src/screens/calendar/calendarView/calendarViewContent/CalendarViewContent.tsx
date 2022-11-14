import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {CalendarActions} from '../../../../store/calendar/calendarActions';
import {CalendarConstants, CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import CalendarViewContentList from './CalendarViewContentList';
import CalendarViewHorizontalPan from '../calendarViewPan/CalendarViewHorizontalPan';
import Animated from 'react-native-reanimated';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';

type CalendarViewContentProps = {
  setHeight: (height: number) => void;
  translate: Animated.SharedValue<number>;
};

const CalendarViewContent = ({setHeight, translate}: CalendarViewContentProps) => {
  const {contentPanRef, imperativeContentPanRef} = useCalendarContext();
  const dispatch = useAppDispatch();
  const dateIndex = useAppSelector(CalendarSelectors.dateIndex);

  const initialDateIndex = useMemo(() => {
    return dateIndex;
  }, []);

  const setDateIndex = useCallback((index: number) => {
    const date = CalendarUtils.getDateByDateIndex(index);
    dispatch(CalendarActions.setDate(date));
  }, []);

  const canScrollLeft = useMemo<boolean>(() => {
    return dateIndex > 0;
  }, [dateIndex]);

  const canScrollRight = useMemo<boolean>(() => {
    return dateIndex < CalendarConstants.maxDateIndex;
  }, [dateIndex]);

  useEffect(() => {
    imperativeContentPanRef.current?.scrollToIndex(dateIndex);
  }, [dateIndex]);

  return (
    <CalendarViewHorizontalPan
      index={initialDateIndex}
      setIndex={setDateIndex}
      canScrollLeft={canScrollLeft}
      canScrollRight={canScrollRight}
      imperativePanRef={imperativeContentPanRef}
      horizontalPanRef={contentPanRef}
    >
      <CalendarViewContentList setHeight={setHeight} translate={translate} />
    </CalendarViewHorizontalPan>
  );
};

export default memo(CalendarViewContent);
