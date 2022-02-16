import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../../models/Item';

type ArchivedItemListState = {
  items: Item[];
  setItems: (items: Item[]) => void;
  count: number;
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  load: (groupId: string, offset?: number, size?: number) => void;
  loading: boolean;
};

export const ArchivedItemListContext = React.createContext<ArchivedItemListState>(null);
export const useArchivedItemListContext = (): ArchivedItemListState => useContext(ArchivedItemListContext);
