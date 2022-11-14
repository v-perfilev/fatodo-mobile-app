import React, {memo, useEffect, useRef} from 'react';
import CalendarViewReminders from '../calendarViewReminders/CalendarViewReminders';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';

type CalendarViewContentItemProps = {
  dateIndex: number;
  freeze: boolean;
  setHeight: (height: number) => void;
  translate: Animated.SharedValue<number>;
};

const CalendarViewContentItem = ({dateIndex, freeze, setHeight, translate}: CalendarViewContentItemProps) => {
  const {width} = useWindowDimensions();
  const storedHeight = useRef<number>(0);

  const handleHeightChange = (height: number) => {
    storedHeight.current = height;
    setHeight(height);
  };

  useEffect(() => {
    !freeze && setHeight(storedHeight.current);
  }, [freeze]);

  const monthStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width * dateIndex,
    width,
    height: '100%',
  }));

  return (
    <Animated.View style={monthStyle}>
      <CalendarViewReminders dateIndex={dateIndex} setHeight={handleHeightChange} translate={translate} />
    </Animated.View>
  );
};

export default memo(CalendarViewContentItem);
