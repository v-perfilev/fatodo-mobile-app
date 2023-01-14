import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {Item} from '../../models/Item';
import {Group} from '../../models/Group';

const getListState = (state: RootState) => state.list;

class ListSelectors {
  static groups = createSelector(getListState, (state) => state.groups as Group[]);

  static items = createSelector(getListState, (state) => state.items as Item[]);

  static allItemsLoaded = createSelector(getListState, (state) => state.allItemsLoaded as boolean);

  static shouldLoad = createSelector(getListState, (state) => state.shouldLoad as boolean);
}

export default ListSelectors;
