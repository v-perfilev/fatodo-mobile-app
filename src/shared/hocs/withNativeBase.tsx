import React, {ComponentType, FC, ReactElement} from 'react';
import ThemeProvider from '../../components/layouts/ThemeProvider';

const withNativeBase =
  (Component: ComponentType): FC =>
  (props: any): ReactElement => {
    return (
      <ThemeProvider>
        <Component {...props} />
      </ThemeProvider>
    );
  };

export default withNativeBase;
