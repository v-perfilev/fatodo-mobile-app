import {AppDispatch} from '../store';
import groupsSlice from './groupsSlice';
import {Group} from '../../models/Group';
import {Item} from '../../models/Item';

export class GroupsActions {
  static setGroups = (groups: Group[]) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setGroups(groups));
  };

  static setCollapsed = (id: string, value: boolean) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setCollapsed({id, value}));
  };

  static setAllCollapsed = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setAllCollapsed(value));
  };

  static createGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.createGroup(group));
  };

  static updateGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.updateGroup(group));
  };

  static deleteGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.deleteGroup(group));
  };

  static createItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.createItem(item));
  };

  static updateItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.updateItem(item));
  };

  static deleteItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.deleteItem(item));
  };
}

export default GroupsActions;
