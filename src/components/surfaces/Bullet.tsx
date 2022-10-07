import React from 'react';
import {Box} from 'native-base';
import {ColorScheme, LINEAR_GRADIENT, ThemeFactory} from '../../shared/themes/ThemeFactory';
import ThemeProvider from '../../shared/themes/ThemeProvider';

type BulletProps = {
  color?: ColorScheme;
  size?: string;
  fullWidth?: boolean;
  inverted?: boolean;
};

const Bullet = ({color, size = '10px', fullWidth, inverted}: BulletProps) => {
  const theme = ThemeFactory.getTheme(color);
  const bgColor = !inverted && color ? LINEAR_GRADIENT : inverted ? 'gray.200' : 'gray.400';
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
