import React, {ComponentType, FC, ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';

const withNavigationContainer =
  (Component: ComponentType): FC =>
  (props): ReactElement => {
    return (
      <NavigationContainer>
        <Component {...props} />
      </NavigationContainer>
    );
  };

export default withNavigationContainer;
