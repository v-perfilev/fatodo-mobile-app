import React, {FC} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import GroupList from '../screens/groups/GroupList';

type GroupStackParamList = {
  GroupList: undefined;
};

const Stack = createNativeStackNavigator<GroupStackParamList>();

export type GroupStackNavigationProp = NativeStackNavigationProp<GroupStackParamList>;

const GroupNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="GroupList">
      <Stack.Screen name="GroupList" component={GroupList} />
    </Stack.Navigator>
  );
};

export default GroupNavigator;
