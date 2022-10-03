import React, {ComponentType, memo} from 'react';
import {RootThemeProvider} from '../../components/layouts/ThemeProvider';
import {flowRight} from 'lodash';

const withNativeBase = (Component: ComponentType) => (props: any) => {
  return (
    <RootThemeProvider>
      <Component {...props} />
    </RootThemeProvider>
  );
};

export default flowRight([memo, withNativeBase]);
