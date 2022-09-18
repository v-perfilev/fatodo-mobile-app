import React, {ReactNode} from 'react';
import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigatorBar from '../components/layouts/TabNavigatorBar';
import GroupNavigator, {GroupParamList} from './GroupNavigator';
import ContactNavigator from './ContactNavigator';
import GroupsIcon from '../components/icons/GroupsIcon';
import ContactsIcon from '../components/icons/ContactsIcon';
import ChatsIcon from '../components/icons/ChatsIcon';
import ChatList from '../screens/chats/chatList/ChatList';
import AlarmIcon from '../components/icons/AlarmIcon';
import EventList from '../screens/events/eventList/EventList';
import {useAppSelector} from '../store/store';
import EventsSelectors from '../store/events/eventsSelectors';
import ChatsSelectors from '../store/chats/chatsSelectors';
import ContactsSelectors from '../store/contacts/contactsSelectors';
import CalendarIcon from '../components/icons/CalendarIcon';
import CalendarView from '../screens/calendar/canlendarView/CalendarView';
import {NavigationProps} from './RootNavigator';

export type TabParamList = {
  Groups: NavigationProps<GroupParamList>;
  Calendar: never;
  Events: never;
  Chats: never;
  Contacts: never;
  Account: never;
};

type TabIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator<TabParamList>();

export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;

const groupsIcon = ({color, size}: TabIconProps): ReactNode => <GroupsIcon color={color} size={size} />;
const calendarIcon = ({color, size}: TabIconProps): ReactNode => <CalendarIcon color={color} size={size} />;
const eventsIcon = ({color, size}: TabIconProps): ReactNode => <AlarmIcon color={color} size={size} />;
const chatsIcon = ({color, size}: TabIconProps): ReactNode => <ChatsIcon color={color} size={size} />;
const contactsIcon = ({color, size}: TabIconProps): ReactNode => <ContactsIcon color={color} size={size} />;

const TabNavigator = () => {
  const unreadEventCount = useAppSelector(EventsSelectors.unreadCount);
  const unreadMessageCount = useAppSelector(ChatsSelectors.unreadCount);
  const incomingRequestCount = useAppSelector(ContactsSelectors.incomingRequestCount);

  return (
    <Tab.Navigator screenOptions={{headerShown: false, lazy: false}} initialRouteName="Groups" tabBar={TabNavigatorBar}>
      <Tab.Screen name="Calendar" component={CalendarView} options={{tabBarIcon: calendarIcon}} />
      <Tab.Screen
        name="Events"
        component={EventList}
        options={{tabBarIcon: eventsIcon, tabBarBadge: unreadEventCount}}
      />
      <Tab.Screen name="Groups" component={GroupNavigator} options={{tabBarIcon: groupsIcon}} />
      <Tab.Screen
        name="Chats"
        component={ChatList}
        options={{tabBarIcon: chatsIcon, tabBarBadge: unreadMessageCount}}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactNavigator}
        options={{tabBarIcon: contactsIcon, tabBarBadge: incomingRequestCount}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
