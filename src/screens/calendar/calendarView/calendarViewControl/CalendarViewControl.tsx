import React, {memo, useCallback, useRef} from 'react';
import CalendarViewTitle from '../CalendarViewTitle';
import Separator from '../../../../components/layouts/Separator';
import CalendarViewHorizontalPan from '../calendarViewPan/CalendarViewHorizontalPan';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import CalendarViewControlList from './CalendarViewControlList';
import CalendarViewControlDays from './CalendarViewControlDays';

const CalendarViewControl = () => {
  const {controlPanRef, controlIndex, setDateByControlIndex, canScrollControlLeft, canScrollControlRight} =
    useCalendarContext();
  const controlIndexesToIgnore = useRef<number[]>([]);

  const setControlIndex = useCallback((index: number) => {
    controlIndexesToIgnore.current?.push(index);
    setDateByControlIndex(index);
  }, []);

  return (
    <>
      <CalendarViewTitle />
      <Separator />
      <CalendarViewControlDays />
      <Separator />
      <CalendarViewHorizontalPan
        index={controlIndex}
        setIndex={setControlIndex}
        canScrollLeft={canScrollControlLeft}
        canScrollRight={canScrollControlRight}
        horizontalPanRef={controlPanRef}
      >
        <CalendarViewControlList />
      </CalendarViewHorizontalPan>
      <Separator />
    </>
  );
};

export default memo(CalendarViewControl);
