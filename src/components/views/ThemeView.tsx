import React, {useMemo} from 'react';
import {Box} from 'native-base';
import {ColorScheme, LINEAR_GRADIENT, ThemeFactory} from '../../shared/themes/ThemeFactory';
import ThemeProvider from '../layouts/ThemeProvider';

type ThemeViewProps = {
  color: ColorScheme;
};

export const ThemeView = ({color}: ThemeViewProps) => {
  const theme = useMemo(() => ThemeFactory.getTheme(color), [color]);

  return (
    <ThemeProvider theme={theme}>
      <Box flex="1" minW="200" bg={LINEAR_GRADIENT} />
    </ThemeProvider>
  );
};

export default ThemeView;
