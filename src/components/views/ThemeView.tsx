import React from 'react';
import {ColorScheme, LINEAR_GRADIENT, ThemeFactory} from '../../shared/themes/ThemeFactory';
import ThemeProvider from '../layouts/ThemeProvider';
import FBox from '../boxes/FBox';

type ThemeViewProps = {
  color: ColorScheme;
};

export const ThemeView = ({color}: ThemeViewProps) => {
  const theme = ThemeFactory.getTheme(color);

  return (
    <ThemeProvider theme={theme}>
      <FBox minW="200" bg={LINEAR_GRADIENT} />
    </ThemeProvider>
  );
};

export default ThemeView;
