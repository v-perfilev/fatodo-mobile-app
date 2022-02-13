import React, {FC, ReactNode} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigatorBar from './TabNavigatorBar';
import GroupNavigator from './GroupNavigator';
import ContactNavigator from './ContactNavigator';
import ChatNavigator from './ChatNavigator';
import Account from '../screens/account/Account';
import GroupsIcon from '../components/icons/GroupsIcon';
import ContactsIcon from '../components/icons/ContactsIcon';
import ChatsIcon from '../components/icons/ChatsIcon';
import AccountIcon from '../components/icons/AccountIcon';

type TabParamList = {
  Groups: undefined;
  Contacts: undefined;
  Chats: undefined;
  Account: undefined;
};

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator<TabParamList>();

const groupsIcon = ({color, size}: TabBarIconProps): ReactNode => <GroupsIcon color={color} size={size} />;
const contactsIcon = ({color, size}: TabBarIconProps): ReactNode => <ContactsIcon color={color} size={size} />;
const chatsIcon = ({color, size}: TabBarIconProps): ReactNode => <ChatsIcon color={color} size={size} />;
const accountIcon = ({color, size}: TabBarIconProps): ReactNode => <AccountIcon color={color} size={size} />;

const TabNavigator: FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Groups" tabBar={TabNavigatorBar}>
      <Tab.Screen
        name="Groups"
        component={GroupNavigator}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: groupsIcon,
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactNavigator}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: contactsIcon,
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatNavigator}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: chatsIcon,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: accountIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
