import React, {ComponentType} from 'react';
import ThemeProvider from '../../components/layouts/ThemeProvider';

const withNativeBase = (Component: ComponentType) => (props: any) => {
  return (
    <ThemeProvider>
      <Component {...props} />
    </ThemeProvider>
  );
};

export default withNativeBase;
