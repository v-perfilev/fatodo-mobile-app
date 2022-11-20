import React, {lazy, memo, useEffect, useRef} from 'react';
import {useWindowDimensions} from 'react-native';
import {Box} from 'native-base';
import LazyLoader from '../../../../components/layouts/LazyLoader';

const CalendarViewReminders = lazy(() => import('../calendarViewReminders/CalendarViewReminders'));

type CalendarViewContentItemProps = {
  dateIndex: number;
  setHeight: (height: number) => void;
};

const CalendarViewContentItem = ({dateIndex, setHeight}: CalendarViewContentItemProps) => {
  const {width} = useWindowDimensions();
  const storedHeight = useRef<number>(0);

  const handleHeightChange = (height: number) => {
    storedHeight.current = height;
    setHeight(height);
  };

  useEffect(() => {
    setHeight(storedHeight.current);
  }, []);

  return (
    <Box position="absolute" left={width * dateIndex} width={width} height="100%">
      <LazyLoader>
        <CalendarViewReminders dateIndex={dateIndex} setHeight={handleHeightChange} />
      </LazyLoader>
    </Box>
  );
};

export default memo(CalendarViewContentItem);
