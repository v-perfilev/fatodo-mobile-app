import React, {useEffect} from 'react';
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

  useEffect(() => {
    setTheme && contextTheme && isFocused && setTheme(contextTheme);
  }, [isFocused, contextTheme]);

  const backgroundColor = bgColor || theme?.colors.primary['800'] || contextTheme?.colors.primary['800'];
  const style = barStyle || 'light-content';

  return (
    <Box bgColor={backgroundColor}>
      <SafeAreaView>
        <StatusBar backgroundColor={backgroundColor} barStyle={style} />
      </SafeAreaView>
    </Box>
  );
};

export default ColoredStatusBar;
