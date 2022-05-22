import {AppDispatch} from '../store';
import {Item} from '../../models/Item';
import groupSlice from './groupSlice';

export class GroupActions {
  static createItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.createItem(item));
  };

  static updaterItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.updateItem(item));
  };
}

export default GroupActions;
