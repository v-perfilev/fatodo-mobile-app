import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {ContactInfo, ContactRelation, ContactRequest} from '../../models/Contact';

const getContactsState = (state: RootState) => state.contacts;

class ContactsSelectors {
  static info = createSelector(
    getContactsState,
    (state) =>
      ({
        relationCount: state.relationCount,
        outcomingRequestCount: state.outcomingRequestCount,
        incomingRequestCount: state.incomingRequestCount,
      } as ContactInfo),
  );

  static incomingRequestCount = createSelector(getContactsState, (state) => state.incomingRequestCount as number);

  static relations = createSelector(getContactsState, (state) => state.relations as ContactRelation[]);

  static outcomingRequests = createSelector(getContactsState, (state) => state.outcomingRequests as ContactRequest[]);

  static incomingRequests = createSelector(getContactsState, (state) => state.incomingRequests as ContactRequest[]);

  static relationsInitialized = createSelector(getContactsState, (state) => state.relationsInitialized as boolean);

  static outcomingRequestsInitialized = createSelector(
    getContactsState,
    (state) => state.outcomingRequestsInitialized as boolean,
  );

  static incomingRequestsInitialized = createSelector(
    getContactsState,
    (state) => state.incomingRequestsInitialized as boolean,
  );
}

export default ContactsSelectors;
