import {NativeBaseProvider} from 'native-base';
import React, {ComponentType, FC, ReactElement} from 'react';

const withNativeBase =
  (Component: ComponentType): FC =>
  (props): ReactElement => {
    return (
      <NativeBaseProvider>
        <Component {...props} />
      </NativeBaseProvider>
    );
  };

export default withNativeBase;
