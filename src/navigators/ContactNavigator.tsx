import React from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import ContactList from '../screens/contacts/contactList/ContactList';
import OutcomingRequestList from '../screens/contacts/outcomingRequestList/OutcomingRequestList';
import IncomingRequestList from '../screens/contacts/incomingRequestList/IncomingRequestList';

type ContactParamList = {
  ContactList: undefined;
  OutcomingRequestList: undefined;
  IncomingRequestList: undefined;
};

const Stack = createNativeStackNavigator<ContactParamList>();

export type ContactNavigationProp = NativeStackNavigationProp<ContactParamList>;

const ContactNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}} initialRouteName="ContactList">
      <Stack.Screen name="ContactList" component={ContactList} />
      <Stack.Screen name="OutcomingRequestList" component={OutcomingRequestList} />
      <Stack.Screen name="IncomingRequestList" component={IncomingRequestList} />
    </Stack.Navigator>
  );
};

export default ContactNavigator;
