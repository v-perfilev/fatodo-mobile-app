import React, {FC} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import ContactList from '../screens/contacts/ContactList';

type ContactStackParamList = {
  ContactList: undefined;
};

const Stack = createNativeStackNavigator<ContactStackParamList>();

export type ContactStackNavigationProp = NativeStackNavigationProp<ContactStackParamList>;

const ContactNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ContactList">
      <Stack.Screen name="ContactList" component={ContactList} />
    </Stack.Navigator>
  );
};

export default ContactNavigator;
