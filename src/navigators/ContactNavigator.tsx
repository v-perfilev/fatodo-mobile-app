import React, {FC} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import ContactList from '../screens/contacts/ContactList';

type ContactParamList = {
  ContactList: undefined;
};

const Stack = createNativeStackNavigator<ContactParamList>();

export type ContactNavigationProp = NativeStackNavigationProp<ContactParamList>;

const ContactNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}} initialRouteName="ContactList">
      <Stack.Screen name="ContactList" component={ContactList} />
    </Stack.Navigator>
  );
};

export default ContactNavigator;
