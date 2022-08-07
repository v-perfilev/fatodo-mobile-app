import React, {useMemo} from 'react';
import {Box} from 'native-base';
import {Theme} from 'native-base/src/theme';
import {ColorScheme, LINEAR_GRADIENT, ThemeFactory} from '../../shared/themes/ThemeFactory';
import ThemeProvider from '../layouts/ThemeProvider';

type BulletProps = {
  color?: ColorScheme;
  size?: string;
  fullWidth?: boolean;
};

const Bullet = ({color, size = '10px', fullWidth}: BulletProps) => {
  const theme = useMemo<Theme>(() => ThemeFactory.getTheme(color), [color]);
  const bgColor = color ? LINEAR_GRADIENT : 'gray.500';
  const width = fullWidth ? '100%' : size;

  return (
    <Box width={width} height={size}>
      <ThemeProvider theme={theme}>
        <Box width={width} height={size} borderRadius={size} bg={bgColor} />
      </ThemeProvider>
    </Box>
  );
};

export default Bullet;
