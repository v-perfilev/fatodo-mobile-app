import * as React from 'react';
import {useContext} from 'react';
import {User} from '../../../models/User';

interface ContactDialogState {
  showContactRequestDialog: () => void;
  showContactRemoveDialog: (user: User) => void;
}

export const ContactDialogContext = React.createContext<ContactDialogState>(null);
export const useContactDialogContext = (): ContactDialogState => useContext(ContactDialogContext);
