import React, {ReactNode} from 'react';
import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigatorBar from '../components/layouts/TabNavigatorBar';
import GroupNavigator from './GroupNavigator';
import ContactNavigator from './ContactNavigator';
import GroupsIcon from '../components/icons/GroupsIcon';
import ContactsIcon from '../components/icons/ContactsIcon';
import ChatsIcon from '../components/icons/ChatsIcon';
import {useTabBarContext} from '../shared/contexts/TabBarContext';
import {flowRight} from 'lodash';
import withTabBar from '../shared/hocs/withTabBar';
import ChatList from '../screens/chats/chatList/ChatList';
import AccountIcon from '../components/icons/AccountIcon';
import AccountNavigator from './AccountNavigator';
import AlarmIcon from '../components/icons/AlarmIcon';
import EventList from '../screens/events/eventList/EventList';

type TabParamList = {
  Groups: any;
  Events: any;
  Chats: any;
  Contacts: any;
  Account: any;
};

type TabIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator<TabParamList>();

export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;

const groupsIcon = ({color, size}: TabIconProps): ReactNode => <GroupsIcon color={color} size={size} />;
const eventsIcon = ({color, size}: TabIconProps): ReactNode => <AlarmIcon color={color} size={size} />;
const chatsIcon = ({color, size}: TabIconProps): ReactNode => <ChatsIcon color={color} size={size} />;
const contactsIcon = ({color, size}: TabIconProps): ReactNode => <ContactsIcon color={color} size={size} />;
const accountIcon = ({color, size}: TabIconProps): ReactNode => <AccountIcon color={color} size={size} />;

const TabNavigator = () => {
  const {theme} = useTabBarContext();
  const color = theme?.colors.primary['500'] || 'primary.500';

  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Events" tabBar={TabNavigatorBar(color)}>
      <Tab.Screen name="Groups" component={GroupNavigator} options={{tabBarIcon: groupsIcon}} />
      <Tab.Screen name="Events" component={EventList} options={{tabBarIcon: eventsIcon}} />
      <Tab.Screen name="Chats" component={ChatList} options={{tabBarIcon: chatsIcon}} />
      <Tab.Screen name="Contacts" component={ContactNavigator} options={{tabBarIcon: contactsIcon}} />
      <Tab.Screen name="Account" component={AccountNavigator} options={{tabBarIcon: accountIcon}} />
    </Tab.Navigator>
  );
};

export default flowRight([withTabBar])(TabNavigator);
