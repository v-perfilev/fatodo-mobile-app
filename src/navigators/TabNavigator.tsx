import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigatorBar from './TabNavigatorBar';
import GroupNavigator from './GroupNavigator';
import ContactNavigator from './ContactNavigator';
import ChatNavigator from './ChatNavigator';
import Account from '../screens/account/Account';

type TabParamList = {
  Groups: undefined;
  Contacts: undefined;
  Chats: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Groups" tabBar={TabNavigatorBar}>
      <Tab.Screen name="Groups" component={GroupNavigator} />
      <Tab.Screen name="Contacts" component={ContactNavigator} />
      <Tab.Screen name="Chats" component={ChatNavigator} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
