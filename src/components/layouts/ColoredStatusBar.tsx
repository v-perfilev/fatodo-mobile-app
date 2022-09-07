import React, {useLayoutEffect} from 'react';
import {Box, StatusBar, useTheme} from 'native-base';
import {SafeAreaView, StatusBarStyle} from 'react-native';
import {useTabBarContext} from '../../shared/contexts/TabBarContext';
import {useIsFocused} from '@react-navigation/native';

type ColoredStatusBarProps = {
  bgColor?: string;
  barStyle?: StatusBarStyle;
};

const ColoredStatusBar = ({bgColor, barStyle}: ColoredStatusBarProps) => {
  const isFocused = useIsFocused();
  const contextTheme = useTheme();
  const {theme, setTheme} = useTabBarContext();

  useLayoutEffect(() => {
    isFocused && setTheme && contextTheme && contextTheme !== theme && setTheme(contextTheme);
  }, [isFocused, contextTheme]);

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
