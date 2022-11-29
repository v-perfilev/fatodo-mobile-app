import * as React from 'react';
import {useContext} from 'react';

interface AccountDialogState {
  showDeletePermanentlyDialog: () => void;
}

export const AccountDialogContext = React.createContext<AccountDialogState>(null);
export const useAccountDialogContext = (): AccountDialogState => useContext(AccountDialogContext);
