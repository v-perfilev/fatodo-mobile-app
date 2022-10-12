import React, {memo} from 'react';
import {Box} from 'native-base';
import {ColorScheme, LINEAR_GRADIENT} from '../../shared/themes/ThemeFactory';
import withThemeProvider from '../../shared/hocs/withThemeProvider';
import {flowRight} from 'lodash';

type BulletProps = {
  color?: ColorScheme;
  size?: string;
  fullWidth?: boolean;
  inverted?: boolean;
};

const Bullet = ({color, size = '10px', fullWidth, inverted}: BulletProps) => {
  const bgColor = !inverted && color ? LINEAR_GRADIENT : inverted ? 'gray.200' : 'gray.400';
  const width = fullWidth ? '100%' : size;

  return (
    <Box width={width} height={size}>
      <Box width={width} height={size} borderRadius={size} bg={bgColor} />
    </Box>
  );
};

export default flowRight([withThemeProvider, memo])(Bullet);
