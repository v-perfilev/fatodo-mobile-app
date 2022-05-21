import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getContactsState = (state: RootState) => state.contacts;

class ContactsSelectors {
  static infoSelector = createSelector(getContactsState, (state) => ({
    relationCount: state.relationCount,
    outcomingRequestCount: state.outcomingRequestCount,
    incomingRequestCount: state.incomingRequestCount,
  }));

  static relationsSelector = createSelector(getContactsState, (state) => state.relations);

  static outcomingRequestsSelector = createSelector(getContactsState, (state) => state.outcomingRequests);

  static incomingRequestsSelector = createSelector(getContactsState, (state) => state.incomingRequests);

  static loadingSelector = createSelector(getContactsState, (state) => state.loading);
}

export default ContactsSelectors;
