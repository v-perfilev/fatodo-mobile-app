import React, {memo} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import GroupList from '../screens/groups/groupList/GroupList';
import GroupView from '../screens/groups/groupView/GroupView';
import {Group} from '../models/Group';
import {Item} from '../models/Item';
import GroupCreate from '../screens/groups/groupCreate/GroupCreate';
import ItemView from '../screens/items/itemView/ItemView';
import GroupEdit from '../screens/groups/groupEdit/GroupEdit';
import ItemCreate from '../screens/items/itemCreate/ItemCreate';
import ItemEdit from '../screens/items/itemEdit/ItemEdit';
import ItemList from '../screens/list/itemList/ItemList';

type GroupRouteProps = {
  group?: Group;
  groupId?: string;
};

type ItemRouteProps = {
  group?: Group;
  item?: Item;
  itemId?: string;
};

export type GroupParamList = {
  ItemList: undefined;
  GroupList: undefined;
  GroupView: GroupRouteProps;
  GroupCreate: undefined;
  GroupEdit: GroupRouteProps;
  ItemView: ItemRouteProps;
  ItemCreate: GroupRouteProps;
  ItemEdit: ItemRouteProps;
  withGroup: GroupRouteProps;
  withItem: ItemRouteProps;
};

const Stack = createNativeStackNavigator<GroupParamList>();

export type GroupNavigationProps = NativeStackNavigationProp<GroupParamList>;

const GroupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}} initialRouteName="ItemList">
      <Stack.Screen name="ItemList" component={ItemList} options={{animation: 'none'}} />
      <Stack.Screen name="GroupList" component={GroupList} options={{animation: 'none'}} />
      <Stack.Screen name="GroupView" component={GroupView} />
      <Stack.Screen name="GroupCreate" component={GroupCreate} />
      <Stack.Screen name="GroupEdit" component={GroupEdit} />
      <Stack.Screen name="ItemView" component={ItemView} />
      <Stack.Screen name="ItemCreate" component={ItemCreate} />
      <Stack.Screen name="ItemEdit" component={ItemEdit} />
    </Stack.Navigator>
  );
};

export default memo(GroupNavigator);
