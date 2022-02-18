import React, {ComponentType, FC, ReactElement} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

const withNavigationContainer =
  (Component: ComponentType): FC =>
  (props: any): ReactElement => {
    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: 'white',
      },
    };

    return (
      <NavigationContainer theme={theme}>
        <Component {...props} />
      </NavigationContainer>
    );
  };

export default withNavigationContainer;
