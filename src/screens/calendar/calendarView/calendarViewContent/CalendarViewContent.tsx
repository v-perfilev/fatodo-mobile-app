import React, {memo, Ref, useCallback, useEffect, useMemo, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {CalendarActions} from '../../../../store/calendar/calendarActions';
import {CalendarConstants, CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import CalendarViewContentList from './CalendarViewContentList';
import CalendarViewHorizontalPan, {
  CalendarViewHorizontalPanMethods,
} from '../calendarViewPan/CalendarViewHorizontalPan';
import {PanGestureHandler} from 'react-native-gesture-handler';

type CalendarViewContentProps = {
  contentPanRef: Ref<PanGestureHandler>;
};

const CalendarViewContent = ({contentPanRef}: CalendarViewContentProps) => {
  const dispatch = useAppDispatch();
  const dateIndex = useAppSelector(CalendarSelectors.dateIndex);
  const imperativePanRef = useRef<CalendarViewHorizontalPanMethods>();

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
    imperativePanRef.current?.scrollToIndex(dateIndex);
  }, [dateIndex]);

  return (
    <CalendarViewHorizontalPan
      index={dateIndex}
      setIndex={setDateIndex}
      canScrollLeft={canScrollLeft}
      canScrollRight={canScrollRight}
      imperativePanRef={imperativePanRef}
      horizontalPanRef={contentPanRef}
    >
      <CalendarViewContentList />
    </CalendarViewHorizontalPan>
  );
};

export default memo(CalendarViewContent);
