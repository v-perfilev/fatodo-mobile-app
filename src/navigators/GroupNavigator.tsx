import React from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import GroupList from '../screens/groups/groupList/GroupList';
import GroupView from '../screens/groups/groupView/GroupView';
import GroupCreate from '../screens/groups/groupCreate/GroupCreate';
import GroupEdit from '../screens/groups/groupEdit/GroupEdit';
import ItemEdit from '../screens/items/itemEdit/ItemEdit';
import ItemCreate from '../screens/items/itemCreate/ItemCreate';
import ItemView from '../screens/items/itemView/ItemView';
import {ColorScheme} from '../shared/themes/ThemeFactory';

export type GroupParamList = {
  GroupList: undefined;
  GroupView: {groupId: string; colorScheme?: ColorScheme};
  GroupCreate: undefined;
  GroupEdit: {groupId: string; colorScheme?: ColorScheme};
  ItemView: {itemId: string; colorScheme?: ColorScheme};
  ItemCreate: {groupId: string; colorScheme?: ColorScheme};
  ItemEdit: {itemId: string; colorScheme?: ColorScheme};
};

const Stack = createNativeStackNavigator<GroupParamList>();

export type GroupNavigationProp = NativeStackNavigationProp<GroupParamList>;

const GroupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}} initialRouteName="GroupList">
      <Stack.Screen name="GroupList" component={GroupList} />
      <Stack.Screen name="GroupView" component={GroupView} />
      <Stack.Screen name="GroupCreate" component={GroupCreate} />
      <Stack.Screen name="GroupEdit" component={GroupEdit} />
      <Stack.Screen name="ItemView" component={ItemView} />
      <Stack.Screen name="ItemCreate" component={ItemCreate} />
      <Stack.Screen name="ItemEdit" component={ItemEdit} />
    </Stack.Navigator>
  );
};

export default GroupNavigator;
