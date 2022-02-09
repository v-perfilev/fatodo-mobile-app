import React, {FC} from 'react';
import Main from '../screens/public/Main';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator: FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Main1" component={Main} />
      <Tab.Screen name="Main2" component={Main} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
