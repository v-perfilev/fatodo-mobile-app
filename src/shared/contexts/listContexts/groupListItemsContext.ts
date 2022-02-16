import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../../models/item.model';

export interface GroupListItemsState {
  items: Map<string, Item[]>;
  counts: Map<string, number>;
  loadInitialState: (groupIds: string[]) => void;
  loadMore: (groupId: string, offset: number, size: number) => void;
  loading: Map<string, boolean>;
  collapsed: Map<string, boolean>;
  setCollapsed: (groupIds: string[], value: boolean) => void;
  allCollapsed: boolean;
  setAllCollapsed: (value: boolean) => void;
}

export const GroupListItemsContext = React.createContext<GroupListItemsState>(null);
export const useGroupListItemsContext = (): GroupListItemsState => useContext(GroupListItemsContext);
