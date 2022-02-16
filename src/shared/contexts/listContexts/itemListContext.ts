import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../../models/Item';

type ItemListState = {
  items: Item[];
  setItems: (items: Item[]) => void;
  count: number;
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  load: (groupId: string, offset?: number, size?: number) => void;
  loading: boolean;
};

export const ItemListContext = React.createContext<ItemListState>(null);
export const useItemListContext = (): ItemListState => useContext(ItemListContext);
