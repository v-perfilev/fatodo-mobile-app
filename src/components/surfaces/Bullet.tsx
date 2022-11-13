import React from 'react';
import {ColorScheme, LINEAR_GRADIENT} from '../../shared/themes/ThemeFactory';
import withThemeProvider from '../../shared/hocs/withThemeProvider';
import {flowRight} from 'lodash';
import {Box} from 'native-base';

type BulletProps = {
  color?: ColorScheme;
  size?: string;
  fullWidth?: boolean;
  inverted?: boolean;
};

const Bullet = ({color, size = '10px', fullWidth, inverted}: BulletProps) => {
  const bgColor = !inverted && color ? LINEAR_GRADIENT : inverted ? 'gray.200' : 'gray.400';
  const width = fullWidth ? '100%' : size;

  return <Box width={width} height={size} borderRadius={size} bg={bgColor} />;
};

export default flowRight([withThemeProvider])(Bullet);
