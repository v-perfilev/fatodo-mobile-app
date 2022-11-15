import React, {memo, useCallback, useRef} from 'react';
import Animated, {runOnJS, useDerivedValue} from 'react-native-reanimated';
import CalendarViewTitle from '../CalendarViewTitle';
import Separator from '../../../../components/layouts/Separator';
import CalendarViewHorizontalPan from '../calendarViewPan/CalendarViewHorizontalPan';
import {useCalendarContext} from '../../../../shared/contexts/CalendarContext';
import CalendarViewControlList from './CalendarViewControlList';

type CalendarViewControlProps = {
  rate: Animated.SharedValue<number>;
};

const CalendarViewControl = ({rate}: CalendarViewControlProps) => {
  const {
    controlPanRef,
    imperativeControlPanRef,
    controlIndex,
    setMode,
    setDateByControlIndex,
    canScrollControlLeft,
    canScrollControlRight,
  } = useCalendarContext();
  const controlIndexesToIgnore = useRef<number[]>([]);

  const setControlIndex = useCallback((index: number) => {
    controlIndexesToIgnore.current?.push(index);
    setDateByControlIndex(index);
  }, []);

  useDerivedValue(() => {
    if (rate.value === 0) {
      runOnJS(setMode)('week');
    } else if (rate.value === 1) {
      runOnJS(setMode)('month');
    }
  });

  return (
    <>
      <CalendarViewTitle />
      <Separator />
      <CalendarViewHorizontalPan
        index={controlIndex}
        setIndex={setControlIndex}
        canScrollLeft={canScrollControlLeft}
        canScrollRight={canScrollControlRight}
        imperativePanRef={imperativeControlPanRef}
        horizontalPanRef={controlPanRef}
      >
        <CalendarViewControlList rate={rate} />
      </CalendarViewHorizontalPan>
      <Separator />
    </>
  );
};

export default memo(CalendarViewControl);
