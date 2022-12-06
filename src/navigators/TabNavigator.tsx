import React, {memo, ReactNode} from 'react';
import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigatorBar from '../components/layouts/TabNavigatorBar';
import GroupsIcon from '../components/icons/GroupsIcon';
import ContactsIcon from '../components/icons/ContactsIcon';
import ChatsIcon from '../components/icons/ChatsIcon';
import {useAppSelector} from '../store/store';
import EventsSelectors from '../store/events/eventsSelectors';
import ChatsSelectors from '../store/chats/chatsSelectors';
import ContactsSelectors from '../store/contacts/contactsSelectors';
import CalendarIcon from '../components/icons/CalendarIcon';
import CommonSelectors from '../store/common/commonSelectors';
import BellIcon from '../components/icons/BellIcon';
import {flowRight} from 'lodash';
import GroupNavigator, {GroupParamList} from './GroupNavigator';
import LazyLoader from '../components/layouts/LazyLoader';
import {NavigationProps} from './RootNavigator';

const CalendarView = React.lazy(() => import('../screens/calendar/calendarView/CalendarView'));
const EventList = React.lazy(() => import('../screens/events/eventList/EventList'));
const ChatList = React.lazy(() => import('../screens/chats/chatList/ChatList'));
const ContactNavigator = React.lazy(() => import('./ContactNavigator'));

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

export type TabNavigationProps = BottomTabNavigationProp<TabParamList>;

const calendarIcon = ({color, size}: TabIconProps): ReactNode => <CalendarIcon color={color} size={size - 1} />;
const eventsIcon = ({color, size}: TabIconProps): ReactNode => <BellIcon color={color} size={size - 1} />;
const groupsIcon = ({color, size}: TabIconProps): ReactNode => <GroupsIcon color={color} size={size + 1} />;
const chatsIcon = ({color, size}: TabIconProps): ReactNode => <ChatsIcon color={color} size={size - 1} />;
const contactsIcon = ({color, size}: TabIconProps): ReactNode => <ContactsIcon color={color} size={size} />;

const CalendarViewWithLoader = () => (
  <LazyLoader fatodoLoader>
    <CalendarView />
  </LazyLoader>
);

const EventListWithLoader = () => (
  <LazyLoader fatodoLoader>
    <EventList />
  </LazyLoader>
);

const ChatListWithLoader = () => (
  <LazyLoader fatodoLoader>
    <ChatList />
  </LazyLoader>
);

const ContactNavigatorWithLoader = () => (
  <LazyLoader fatodoLoader>
    <ContactNavigator />
  </LazyLoader>
);

const TabNavigator = () => {
  const unreadEventCount = useAppSelector(EventsSelectors.unreadCount);
  const unreadMessageCount = useAppSelector(ChatsSelectors.unreadCount);
  const incomingRequestCount = useAppSelector(ContactsSelectors.incomingRequestCount);
  const freezeOnBlur = useAppSelector(CommonSelectors.freeze);

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, freezeOnBlur}}
      initialRouteName="Groups"
      backBehavior="initialRoute"
      tabBar={TabNavigatorBar}
    >
      <Tab.Screen name="Calendar" component={CalendarViewWithLoader} options={{tabBarIcon: calendarIcon}} />
      <Tab.Screen
        name="Events"
        component={EventListWithLoader}
        options={{tabBarIcon: eventsIcon, tabBarBadge: unreadEventCount}}
      />
      <Tab.Screen name="Groups" component={GroupNavigator} options={{tabBarIcon: groupsIcon}} />
      <Tab.Screen
        name="Chats"
        component={ChatListWithLoader}
        options={{tabBarIcon: chatsIcon, tabBarBadge: unreadMessageCount}}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactNavigatorWithLoader}
        options={{tabBarIcon: contactsIcon, tabBarBadge: incomingRequestCount}}
      />
    </Tab.Navigator>
  );
};

export default flowRight([memo])(TabNavigator);
