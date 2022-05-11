import * as React from 'react';
import {useContext} from 'react';
import {ContactRelation} from '../../../models/ContactRelation';
import {ContactRequest} from '../../../models/ContactRequest';

export interface ContactState {
  relations: ContactRelation[];
  outcomingRequests: ContactRequest[];
  incomingRequests: ContactRequest[];
  update: () => void;
  loading: boolean;
}

const defaultContactState = {
  relations: [],
  loading: false,
} as ContactState;

export const ContactContext = React.createContext<ContactState>(defaultContactState);
export const useContactContext = (): ContactState => useContext(ContactContext);
