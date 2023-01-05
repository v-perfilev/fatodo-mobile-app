import React, {memo, PropsWithChildren, useEffect} from 'react';
import {ColorMode, ITheme, NativeBaseProvider, StorageManager, useColorMode} from 'native-base';
import {ThemeFactory} from './ThemeFactory';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeProviderProps = PropsWithChildren<{
  theme?: ITheme;
  colorNotSet?: boolean;
}>;

type RootThemeProviderProps = PropsWithChildren<{}>;

type ThemeProviderChildProps = PropsWithChildren<{
  parentColorMode?: ColorMode;
}>;

const defaultTheme = ThemeFactory.getDefaultTheme();

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.error(e);
    }
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

const ThemeProvider = ({theme = defaultTheme, colorNotSet, children}: ThemeProviderProps) => {
  const {colorMode} = useColorMode();
  const preparedTheme: ITheme = {...theme, config: {initialColorMode: colorMode}};

  return !colorNotSet ? (
    <NativeBaseProvider theme={preparedTheme} config={config}>
      <ThemeProviderChild parentColorMode={colorMode}>{children}</ThemeProviderChild>
    </NativeBaseProvider>
  ) : (
    <>{children}</>
  );
};

export const RootThemeProvider = ({children}: RootThemeProviderProps) => {
  return (
    <NativeBaseProvider theme={defaultTheme} config={config} colorModeManager={colorModeManager}>
      {children}
    </NativeBaseProvider>
  );
};

export default memo(ThemeProvider);
