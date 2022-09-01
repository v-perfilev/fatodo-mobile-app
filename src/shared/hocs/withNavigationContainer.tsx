import React, {ComponentType, memo} from 'react';
import {createNavigationContainerRef, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {RootParamList} from '../../navigators/RootNavigator';
import {flowRight} from 'lodash';

export const navigationRef = createNavigationContainerRef<RootParamList>();

const withNavigationContainer = (Component: ComponentType) => (props: any) => {
  const theme = {...DefaultTheme, colors: {...DefaultTheme.colors, background: 'white'}};

  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
      <Component {...props} />
    </NavigationContainer>
  );
};

export default flowRight([memo, withNavigationContainer]);
