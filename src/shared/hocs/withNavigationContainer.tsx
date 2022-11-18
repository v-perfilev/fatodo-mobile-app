import React, {ComponentType, memo} from 'react';
import {createNavigationContainerRef, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {ProtectedParamList} from '../../navigators/ProtectedNavigator';
import {flowRight} from 'lodash';
import {useColorModeValue} from 'native-base';
import {DARK_BG, LIGHT_BG} from '../themes/colors';

export const navigationRef = createNavigationContainerRef<ProtectedParamList>();

const withNavigationContainer = (Component: ComponentType) => (props: any) => {
  const background = useColorModeValue(LIGHT_BG, DARK_BG);
  const theme = {...DefaultTheme, colors: {...DefaultTheme.colors, background}};

  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
      <Component {...props} />
    </NavigationContainer>
  );
};

export default flowRight([memo, withNavigationContainer]);
