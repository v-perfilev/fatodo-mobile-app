import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../../models/Item';

interface ItemDialogState {
  showItemDeleteDialog: (item: Item, onSuccess?: () => void) => void;
}

export const ItemDialogContext = React.createContext<ItemDialogState>(null);
export const useItemDialogContext = (): ItemDialogState => useContext(ItemDialogContext);
