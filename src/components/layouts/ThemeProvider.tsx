import React, {PropsWithChildren, useEffect} from 'react';
import {ColorMode, ITheme, NativeBaseProvider, useColorMode} from 'native-base';
import {ThemeFactory} from '../../shared/themes/ThemeFactory';

type ThemeProviderProps = PropsWithChildren<{
  theme?: ITheme;
}>;

type ThemeProviderChildProps = PropsWithChildren<{
  parentColorMode?: ColorMode;
}>;

const defaultTheme = ThemeFactory.getDefaultTheme();

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const ThemeProviderChild = ({parentColorMode, children}: ThemeProviderChildProps) => {
  const {colorMode, setColorMode} = useColorMode();

  useEffect(() => {
    if (parentColorMode !== colorMode) {
      setColorMode(parentColorMode);
    }
  }, [parentColorMode]);

  return <>{children}</>;
};

const ThemeProvider = ({theme = defaultTheme, children}: ThemeProviderProps) => {
  const {colorMode} = useColorMode();

  const preparedTheme: ITheme = {...theme, config: {initialColorMode: colorMode}};

  return (
    <NativeBaseProvider theme={preparedTheme} config={config}>
      <ThemeProviderChild parentColorMode={colorMode}>{children}</ThemeProviderChild>
    </NativeBaseProvider>
  );
};

export default ThemeProvider;
