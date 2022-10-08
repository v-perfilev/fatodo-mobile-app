import React, {useEffect} from 'react';
import {StatusBar, useColorMode, useColorModeValue} from 'native-base';
import {Platform, StatusBarStyle} from 'react-native';
import {DARK_BG, LIGHT_BG} from '../../shared/themes/colors';
import SystemNavigationBar from 'react-native-system-navigation-bar';

type ColoredStatusBarProps = {
  bgColor?: string;
  barStyle?: StatusBarStyle;
};

const ColoredStatusBar = ({bgColor, barStyle}: ColoredStatusBarProps) => {
  const colorMode = useColorMode();
  const background = useColorModeValue(LIGHT_BG, DARK_BG);
  const bar = useColorModeValue('dark-content', 'light-content');

  const bg = bgColor || background;
  const style = barStyle || bar;

  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemNavigationBar.setNavigationColor(background).finally();
    }
  }, [colorMode]);

  return <StatusBar backgroundColor={bg} barStyle={style} />;
};

export default ColoredStatusBar;
