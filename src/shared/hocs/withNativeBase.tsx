import React, {ComponentType, memo} from 'react';
import ThemeProvider from '../../components/layouts/ThemeProvider';
import {flowRight} from 'lodash';

const withNativeBase = (Component: ComponentType) => (props: any) => {
  return (
    <ThemeProvider>
      <Component {...props} />
    </ThemeProvider>
  );
};

export default flowRight([memo, withNativeBase]);
