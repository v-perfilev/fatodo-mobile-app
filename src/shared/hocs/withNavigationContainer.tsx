import React, {ComponentType, memo, useEffect, useState} from 'react';
import {createNavigationContainerRef, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {flowRight} from 'lodash';
import {ColorMode, useColorMode} from 'native-base';
import {DARK_BG, LIGHT_BG} from '../themes/colors';
import {RootThemeProvider} from '../themes/ThemeProvider';
import {RootParamList} from '../../navigators/RootNavigator';

export const navigationRef = createNavigationContainerRef<RootParamList>();

const withNavigationContainer = (Component: ComponentType) => (props: any) => {
  const [colorMode, setColorMode] = useState<ColorMode>();
  const background = colorMode === 'light' ? LIGHT_BG : DARK_BG;
  const theme = {...DefaultTheme, colors: {...DefaultTheme.colors, background}};

  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
      <Component {...props} setColorMode={setColorMode} />
    </NavigationContainer>
  );
};

const withNativeBase = (Component: ComponentType) => (props: any) => {
  return (
    <RootThemeProvider>
      <Component {...props} />
    </RootThemeProvider>
  );
};

const withColorModeUpdater =
  (Component: ComponentType) =>
  ({setColorMode, ...props}: any) => {
    const {colorMode} = useColorMode();

    useEffect(() => {
      setColorMode(colorMode);
    }, [colorMode]);

    return <Component {...props} />;
  };

export default flowRight([memo, withNavigationContainer, withNativeBase, withColorModeUpdater]);
