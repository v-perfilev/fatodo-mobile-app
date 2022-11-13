import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {CalendarActions} from '../../../../store/calendar/calendarActions';
import {CalendarConstants, CalendarUtils} from '../../../../shared/utils/CalendarUtils';
import CalendarViewContentList from './CalendarViewContentList';
import CalendarViewHorizontalPan, {
  CalendarViewHorizontalPanMethods,
} from '../calendarViewPan/CalendarViewHorizontalPan';

const CalendarViewContent = () => {
  const dispatch = useAppDispatch();
  const dateIndex = useAppSelector(CalendarSelectors.dateIndex);
  const controlPanRef = useRef<CalendarViewHorizontalPanMethods>();

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
    controlPanRef.current.scrollToIndex(dateIndex);
  }, [dateIndex]);

  return (
    <CalendarViewHorizontalPan
      index={dateIndex}
      setIndex={setDateIndex}
      canScrollLeft={canScrollLeft}
      canScrollRight={canScrollRight}
      controlPanRef={controlPanRef}
    >
      <CalendarViewContentList />
    </CalendarViewHorizontalPan>
  );
};

export default memo(CalendarViewContent);
