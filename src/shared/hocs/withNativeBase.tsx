import {NativeBaseProvider} from 'native-base';
import React, {ComponentType, FC, ReactElement} from 'react';
import {ThemeFactory} from '../themes/ThemeFactory';

const defaultTheme = ThemeFactory.getDefaultTheme();

const withNativeBase =
  (Component: ComponentType): FC =>
  (props): ReactElement => {
    return (
      <NativeBaseProvider theme={defaultTheme}>
        <Component {...props} />
      </NativeBaseProvider>
    );
  };

export default withNativeBase;
