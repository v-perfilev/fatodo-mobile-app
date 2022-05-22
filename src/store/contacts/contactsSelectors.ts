import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getContactsState = (state: RootState) => state.contacts;

class ContactsSelectors {
  static info = createSelector(getContactsState, (state) => ({
    relationCount: state.relationCount,
    outcomingRequestCount: state.outcomingRequestCount,
    incomingRequestCount: state.incomingRequestCount,
  }));

  static relations = createSelector(getContactsState, (state) => state.relations);

  static outcomingRequests = createSelector(getContactsState, (state) => state.outcomingRequests);

  static incomingRequests = createSelector(getContactsState, (state) => state.incomingRequests);

  static loading = createSelector(getContactsState, (state) => state.loading);
}

export default ContactsSelectors;
