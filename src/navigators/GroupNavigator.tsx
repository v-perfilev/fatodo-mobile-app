import React, {FC} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import GroupList from '../screens/groups/groupList/GroupList';
import GroupView from '../screens/groups/groupView/GroupView';
import GroupCreate from '../screens/groups/groupCreate/GroupCreate';
import GroupEdit from '../screens/groups/groupEdit/GroupEdit';

type GroupParamList = {
  GroupList: undefined;
  GroupView: undefined;
  GroupCreate: undefined;
  GroupEdit: undefined;
};

const Stack = createNativeStackNavigator<GroupParamList>();

export type GroupNavigationProp = NativeStackNavigationProp<GroupParamList>;

const GroupNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}} initialRouteName="GroupList">
      <Stack.Screen name="GroupList" component={GroupList} />
      <Stack.Screen name="GroupView" component={GroupView} />
      <Stack.Screen name="GroupCreate" component={GroupCreate} />
      <Stack.Screen name="GroupEdit" component={GroupEdit} />
    </Stack.Navigator>
  );
};

export default GroupNavigator;
