import React, {FC, useEffect} from 'react';
import {Box, StatusBar, useTheme} from 'native-base';
import {SafeAreaView, StatusBarStyle} from 'react-native';
import {useTabBarContext} from '../../shared/contexts/TabBarContext';
import {useIsFocused} from '@react-navigation/native';

type ColoredStatusBarProps = {
  bgColor?: string;
  barStyle?: StatusBarStyle;
};

const ColoredStatusBar: FC<ColoredStatusBarProps> = ({bgColor, barStyle}) => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const {setTheme} = useTabBarContext();

  useEffect(() => {
    if (setTheme && theme && isFocused) {
      setTheme(theme);
    }
  }, [isFocused, theme]);

  const backgroundColor = bgColor || theme.colors.primary[700];
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
