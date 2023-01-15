import React, {useContext} from 'react';
import {Group} from '../../../models/Group';

interface ListDialogState {
  showCreateDialog: (groups: Group[]) => void;
  showCreateItemDialog: (groups: Group[]) => void;
}

export const ListDialogContext = React.createContext<ListDialogState>(null);
export const useListDialogContext = (): ListDialogState => useContext(ListDialogContext);
