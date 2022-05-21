import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getContactState = (state: RootState) => state.contact;

class ContactSelectors {
  static infoSelector = createSelector(getContactState, (state) => ({
    relationCount: state.relationCount,
    outcomingRequestCount: state.outcomingRequestCount,
    incomingRequestCount: state.incomingRequestCount,
  }));

  static relationsSelector = createSelector(getContactState, (state) => state.relations);

  static outcomingRequestsSelector = createSelector(getContactState, (state) => state.outcomingRequests);

  static incomingRequestsSelector = createSelector(getContactState, (state) => state.incomingRequests);

  static loadingSelector = createSelector(getContactState, (state) => state.loading);
}

export default ContactSelectors;
