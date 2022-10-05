import React from 'react';
import {ColorScheme, LINEAR_GRADIENT, ThemeFactory} from '../../shared/themes/ThemeFactory';
import ThemeProvider from '../../shared/themes/ThemeProvider';
import FBox from '../boxes/FBox';
import {IBoxProps} from 'native-base';

type ThemeViewProps = IBoxProps & {
  color: ColorScheme;
};

export const ThemeView = ({color, ...props}: ThemeViewProps) => {
  const theme = ThemeFactory.getTheme(color);

  return (
    <ThemeProvider theme={theme}>
      <FBox {...props} bg={LINEAR_GRADIENT} />
    </ThemeProvider>
  );
};

export default ThemeView;
