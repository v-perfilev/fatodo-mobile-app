import React from 'react';
import {ColorScheme} from '../../shared/themes/ThemeFactory';
import {Box, useToken} from 'native-base';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

type BulletProps = {
  colorScheme?: ColorScheme;
  size?: string;
  fullWidth?: boolean;
  inverted?: Animated.SharedValue<boolean>;
};

const AnimatedBox = Animated.createAnimatedComponent(Box);

const Bullet = ({colorScheme, size = '10px', fullWidth, inverted}: BulletProps) => {
  const [primary400, gray100, gray400] = useToken('colors', [
    `${colorScheme || 'primary'}.500`,
    'gray.100',
    'gray.400',
  ]);
  const width = fullWidth ? '100%' : size;

  const style = useAnimatedStyle(() => ({
    backgroundColor: !inverted?.value && colorScheme ? primary400 : inverted?.value ? gray100 : gray400,
  }));

  return <AnimatedBox style={style} width={width} height={size} borderRadius={size} />;
};

export default Bullet;
