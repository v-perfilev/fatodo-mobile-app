import React from 'react';
import {Box, StatusBar} from 'native-base';
import {SafeAreaView, StatusBarStyle} from 'react-native';

type ColoredStatusBarProps = {
  bgColor?: string;
  barStyle?: StatusBarStyle;
};

const ColoredStatusBar = ({bgColor, barStyle}: ColoredStatusBarProps) => {
  const backgroundColor = bgColor || 'white';
  const style = barStyle || 'dark-content';

  return (
    <Box bgColor={backgroundColor}>
      <SafeAreaView>
        <StatusBar backgroundColor={backgroundColor} barStyle={style} />
      </SafeAreaView>
    </Box>
  );
};

export default ColoredStatusBar;
