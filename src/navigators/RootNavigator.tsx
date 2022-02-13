import React, {FC} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

type RootStackParamList = {
  Tab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RootNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
