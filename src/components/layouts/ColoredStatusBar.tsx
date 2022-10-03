import React from 'react';
import {Box, StatusBar, useColorModeValue} from 'native-base';
import {SafeAreaView, StatusBarStyle} from 'react-native';
import {DARK_BG, LIGHT_BG} from '../../shared/themes/colors';

type ColoredStatusBarProps = {
  bgColor?: string;
  barStyle?: StatusBarStyle;
};

const ColoredStatusBar = ({bgColor, barStyle}: ColoredStatusBarProps) => {
  const background = useColorModeValue(LIGHT_BG, DARK_BG);
  const bar = useColorModeValue('dark-content', 'light-content');

  const bg = bgColor || background;
  const style = barStyle || bar;

  return (
    <Box bg={bg}>
      <SafeAreaView>
        <StatusBar backgroundColor={bg} barStyle={style} />
      </SafeAreaView>
    </Box>
  );
};

export default ColoredStatusBar;
