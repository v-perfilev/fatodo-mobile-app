import {Box, Text} from 'native-base';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import React from 'react';

type CalendarViewPanControlProps = {
  height: Animated.SharedValue<number>;
};

const CalendarViewPanControl = ({height}: CalendarViewPanControlProps) => {
  const style = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <Animated.View style={style}>
      <Box width="100%" height="100%" backgroundColor="blue.300">
        <Text>Test</Text>
      </Box>
    </Animated.View>
  );
};

export default CalendarViewPanControl;
