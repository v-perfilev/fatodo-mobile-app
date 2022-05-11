import * as React from 'react';
import {useContext} from 'react';

export interface ContactInfoState {
  relationCount: number;
  outcomingRequestCount: number;
  incomingRequestCount: number;
  update: () => void;
}

const defaultContactInfoState = {
  relationCount: 0,
  outcomingRequestCount: 0,
  incomingRequestCount: 0,
} as ContactInfoState;

export const ContactInfoContext = React.createContext<ContactInfoState>(defaultContactInfoState);
export const useContactInfoContext = (): ContactInfoState => useContext(ContactInfoContext);
