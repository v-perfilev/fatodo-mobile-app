import React, {ComponentType} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

const withNavigationContainer = (Component: ComponentType) => (props: any) => {
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
