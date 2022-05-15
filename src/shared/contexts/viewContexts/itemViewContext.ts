import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../../models/Item';

type ItemViewState = {
  item: Item;
  setItem: (item: Item) => void;
  load: (itemId: string, failedAction?: () => void, notFoundAction?: () => void) => void;
  loading: boolean;
};

export const ItemViewContext = React.createContext<ItemViewState>(null);
export const useItemViewContext = (): ItemViewState => useContext(ItemViewContext);
