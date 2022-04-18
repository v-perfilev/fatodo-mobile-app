import React, {FC} from 'react';
import {Box, StatusBar, useTheme} from 'native-base';
import {SafeAreaView, StatusBarStyle} from 'react-native';

type CustomStatusBarProps = {
  bgColor?: string;
  barStyle?: StatusBarStyle;
};

const CustomStatusBar: FC<CustomStatusBarProps> = ({bgColor, barStyle}) => {
  const theme = useTheme();

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

export default CustomStatusBar;
