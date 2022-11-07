import React, {memo, ReactNode} from 'react';
import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigatorBar from '../components/layouts/TabNavigatorBar';
import GroupNavigator, {GroupParamList} from './GroupNavigator';
import ContactNavigator from './ContactNavigator';
import GroupsIcon from '../components/icons/GroupsIcon';
import ContactsIcon from '../components/icons/ContactsIcon';
import ChatsIcon from '../components/icons/ChatsIcon';
import ChatList from '../screens/chats/chatList/ChatList';
import EventList from '../screens/events/eventList/EventList';
import {useAppSelector} from '../store/store';
import EventsSelectors from '../store/events/eventsSelectors';
import ChatsSelectors from '../store/chats/chatsSelectors';
import ContactsSelectors from '../store/contacts/contactsSelectors';
import CalendarIcon from '../components/icons/CalendarIcon';
import {NavigationProps} from './RootNavigator';
import CommonSelectors from '../store/common/commonSelectors';
import BellIcon from '../components/icons/BellIcon';
import {flowRight} from 'lodash';
import CalendarView from '../screens/calendar/calendarView/CalendarView';

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

const calendarIcon = ({color, size}: TabIconProps): ReactNode => <CalendarIcon color={color} size={size - 1} />;
const eventsIcon = ({color, size}: TabIconProps): ReactNode => <BellIcon color={color} size={size - 1} />;
const groupsIcon = ({color, size}: TabIconProps): ReactNode => <GroupsIcon color={color} size={size + 1} />;
const chatsIcon = ({color, size}: TabIconProps): ReactNode => <ChatsIcon color={color} size={size - 1} />;
const contactsIcon = ({color, size}: TabIconProps): ReactNode => <ContactsIcon color={color} size={size} />;

const TabNavigator = () => {
  const unreadEventCount = useAppSelector(EventsSelectors.unreadCount);
  const unreadMessageCount = useAppSelector(ChatsSelectors.unreadCount);
  const incomingRequestCount = useAppSelector(ContactsSelectors.incomingRequestCount);
  const freeze = useAppSelector(CommonSelectors.freeze);

  // TODO set Groups as default route
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, freezeOnBlur: freeze}}
      // initialRouteName="Groups"
      initialRouteName="Calendar"
      backBehavior="initialRoute"
      tabBar={TabNavigatorBar}
    >
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

export default flowRight([memo])(TabNavigator);
