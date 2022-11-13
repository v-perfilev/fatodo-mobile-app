import React, {memo, useEffect, useRef} from 'react';
import CalendarViewReminders from '../calendarViewReminders/CalendarViewReminders';
import CentredSpinner from '../../../../components/surfaces/CentredSpinner';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';

type CalendarViewContentItemProps = {
  dateIndex: number;
  freeze: boolean;
};

const CalendarViewContentItem = ({dateIndex, freeze}: CalendarViewContentItemProps) => {
  const {width} = useWindowDimensions();
  const loaded = useRef<boolean>(false);

  useEffect(() => {
    !freeze && (loaded.current = true);
  }, [freeze]);

  const monthStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: width * dateIndex,
    width,
    height: '100%',
  }));

  return (
    <Animated.View style={monthStyle}>
      {!freeze || loaded ? <CalendarViewReminders dateIndex={dateIndex} /> : <CentredSpinner />}
    </Animated.View>
  );
};

const propsAreEqual = (prevProps: CalendarViewContentItemProps, nextProps: CalendarViewContentItemProps): boolean => {
  return !prevProps.freeze || nextProps.freeze;
};

export default memo(CalendarViewContentItem, propsAreEqual);
