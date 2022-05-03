import React, {PropsWithChildren} from 'react';
import {ITheme, NativeBaseProvider} from 'native-base';
import {ThemeFactory} from '../../shared/themes/ThemeFactory';

type ThemeProviderProps = PropsWithChildren<{
  theme?: ITheme;
}>;

const defaultTheme = ThemeFactory.getDefaultTheme();

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const ThemeProvider = ({theme = defaultTheme, children}: ThemeProviderProps) => {
  return (
    <NativeBaseProvider theme={theme} config={config}>
      {children}
    </NativeBaseProvider>
  );
};

export default ThemeProvider;
