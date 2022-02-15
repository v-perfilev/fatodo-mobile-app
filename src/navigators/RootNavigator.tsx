import React, {FC} from 'react';
import TabNavigator from './TabNavigator';
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer';

type RootParamList = {
  Tab: undefined;
};

const Stack = createDrawerNavigator<RootParamList>();

export type RootNavigationProp = DrawerNavigationProp<RootParamList>;

const RootNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
