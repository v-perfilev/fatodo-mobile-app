import {AppDispatch} from '../store';
import groupsSlice from './groupsSlice';
import {Group} from '../../models/Group';
import {Item} from '../../models/Item';

class GroupsActions {
  static setGroups = (groups: Group[]) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setGroups(groups));
  };

  static cacheGroups = () => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.cacheGroups());
  };

  static resetGroupsFromCache = () => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.resetGroupsFromCache());
  };

  static setCollapsed = (id: string, value: boolean) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setCollapsed({id, value}));
  };

  static setAllCollapsed = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setAllCollapsed(value));
  };

  static addGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.addGroup(group));
  };

  static updateGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.updateGroup(group));
  };

  static removeGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.removeGroup(group));
  };

  static addItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.addItem(item));
  };

  static updateItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.updateItem(item));
  };

  static removeItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.removeItem(item));
  };
}

export default GroupsActions;
