import React, {FC} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import GroupList from '../screens/groups/groupList/GroupList';

type GroupParamList = {
  GroupList: undefined;
};

const Stack = createNativeStackNavigator<GroupParamList>();

export type GroupNavigationProp = NativeStackNavigationProp<GroupParamList>;

const GroupNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="GroupList">
      <Stack.Screen name="GroupList" component={GroupList} />
    </Stack.Navigator>
  );
};

export default GroupNavigator;
