import * as React from 'react';
import {useContext} from 'react';

interface ContactDialogState {
  showContactRequestDialog: (onSuccess?: () => void) => void;
}

export const ContactDialogContext = React.createContext<ContactDialogState>(null);
export const useContactDialogContext = (): ContactDialogState => useContext(ContactDialogContext);
