import {AppDispatch} from '../store';
import {Item} from '../../models/Item';
import groupSlice from './groupSlice';
import {Group} from '../../models/Group';

class GroupActions {
  static updateGroup = (group: Group) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.updateGroup(group));
  };

  static addItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.addItem(item));
  };

  static updateItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.updateItem(item));
  };

  static updaterItemArchived = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.updateItemArchived(item));
  };

  static updaterItemStatus = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.updateItemStatus(item));
  };

  static removeItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.removeItem(item));
  };
}

export default GroupActions;
