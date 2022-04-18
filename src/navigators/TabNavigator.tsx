import React, {FC, ReactNode} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigatorBar from '../components/layouts/TabNavigatorBar';
import GroupNavigator from './GroupNavigator';
import ContactNavigator from './ContactNavigator';
import ChatNavigator from './ChatNavigator';
import GroupsIcon from '../components/icons/GroupsIcon';
import ContactsIcon from '../components/icons/ContactsIcon';
import ChatsIcon from '../components/icons/ChatsIcon';
import {SafeAreaView} from 'react-native';

type TabParamList = {
  Groups: undefined;
  Contacts: undefined;
  Chats: undefined;
};

type TabIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator<TabParamList>();

const groupsIcon = ({color, size}: TabIconProps): ReactNode => <GroupsIcon color={color} size={size} />;
const contactsIcon = ({color, size}: TabIconProps): ReactNode => <ContactsIcon color={color} size={size} />;
const chatsIcon = ({color, size}: TabIconProps): ReactNode => <ChatsIcon color={color} size={size} />;

const TabNavigator: FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Groups" tabBar={TabNavigatorBar}>
      <Tab.Screen name="Groups" component={GroupNavigator} options={{tabBarIcon: groupsIcon}} />
      <Tab.Screen name="Contacts" component={ContactNavigator} options={{tabBarIcon: contactsIcon}} />
      <Tab.Screen name="Chats" component={ChatNavigator} options={{tabBarIcon: chatsIcon}} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
