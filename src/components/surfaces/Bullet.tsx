import React from 'react';
import {ColorScheme} from '../../shared/themes/ThemeFactory';
import withThemeProvider from '../../shared/hocs/withThemeProvider';
import {flowRight} from 'lodash';
import {Box, useTheme} from 'native-base';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

type BulletProps = {
  color?: ColorScheme;
  size?: string;
  fullWidth?: boolean;
  inverted?: Animated.SharedValue<boolean>;
};

const AnimatedBox = Animated.createAnimatedComponent(Box);

const Bullet = ({color, size = '10px', fullWidth, inverted}: BulletProps) => {
  const theme = useTheme();
  const width = fullWidth ? '100%' : size;

  const primary400 = theme.colors.primary['400'];
  const gray100 = theme.colors.gray['100'];
  const gray400 = theme.colors.gray['400'];

  const style = useAnimatedStyle(() => ({
    backgroundColor: !inverted?.value && color ? primary400 : inverted?.value ? gray100 : gray400,
  }));

  return <AnimatedBox style={style} width={width} height={size} borderRadius={size} />;
};

export default flowRight([withThemeProvider])(Bullet);
