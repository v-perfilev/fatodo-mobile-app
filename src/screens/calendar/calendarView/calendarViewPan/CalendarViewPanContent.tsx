import {Box, Text} from 'native-base';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import React, {Dispatch, SetStateAction} from 'react';
import {LayoutChangeEvent} from 'react-native';

type CalendarViewPanContentProps = {
  translateY: Animated.SharedValue<number>;
  setContentHeight: Dispatch<SetStateAction<number>>;
};

const CalendarViewPanContent = ({translateY, setContentHeight}: CalendarViewPanContentProps) => {
  const style = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const handleLayout = (e: LayoutChangeEvent): void => {
    const height = e.nativeEvent.layout.height;
    setContentHeight(height);
  };

  return (
    <Box overflow="hidden">
      <Animated.View style={style} onLayout={handleLayout}>
        {Array.from({length: 100}).map((_, i) => (
          <Text key={i}>{i}</Text>
        ))}
      </Animated.View>
    </Box>
  );
};

export default CalendarViewPanContent;
