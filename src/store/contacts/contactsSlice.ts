import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ContactsState} from './contactsType';
import {ContactsActions} from './contactsActions';
import {ContactRelation, ContactRequest} from '../../models/Contact';
import {FilterUtils} from '../../shared/utils/FilterUtils';

const initialState: ContactsState = {
  relationCount: 0,
  outcomingRequestCount: 0,
  incomingRequestCount: 0,
  relations: [],
  outcomingRequests: [],
  incomingRequests: [],
  relationsInitialized: false,
  incomingRequestsInitialized: false,
  outcomingRequestsInitialized: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    reset: (state: ContactsState) => {
      Object.assign(state, initialState);
    },

    setRelations: (state: ContactsState, action: PayloadAction<ContactRelation[]>) => {
      state.relations = filterRelations(action.payload);
      state.relationCount = state.relations.length;
    },

    addRelation: (state: ContactsState, action: PayloadAction<ContactRelation>) => {
      state.relations = filterRelations([action.payload, ...state.relations]);
      state.relationCount = state.relations.length;
    },

    removeRelation: (state: ContactsState, action: PayloadAction<string>) => {
      state.relations = state.relations.filter((relation) => relation.secondUserId !== action.payload);
      state.relationCount = state.relations.length;
    },

    setRelationCount: (state: ContactsState, action: PayloadAction<number>) => {
      state.relationCount = action.payload;
    },

    setIncomingRequests: (state: ContactsState, action: PayloadAction<ContactRequest[]>) => {
      state.incomingRequests = filterIncomingRequests(action.payload);
      state.incomingRequestCount = state.incomingRequests.length;
    },

    addIncomingRequest: (state: ContactsState, action: PayloadAction<ContactRequest>) => {
      state.incomingRequests = filterIncomingRequests([action.payload, ...state.incomingRequests]);
      state.incomingRequestCount = state.incomingRequests.length;
    },

    removeIncomingRequest: (state: ContactsState, action: PayloadAction<string>) => {
      state.incomingRequests = state.incomingRequests.filter((request) => request.requesterId !== action.payload);
      state.incomingRequestCount = state.incomingRequests.length;
    },

    setIncomingRequestCount: (state: ContactsState, action: PayloadAction<number>) => {
      state.incomingRequestCount = action.payload;
    },

    setOutcomingRequests: (state: ContactsState, action: PayloadAction<ContactRequest[]>) => {
      state.outcomingRequests = filterOutcomingRequests(action.payload);
      state.outcomingRequestCount = state.outcomingRequests.length;
    },

    addOutcomingRequest: (state: ContactsState, action: PayloadAction<ContactRequest>) => {
      state.outcomingRequests = filterOutcomingRequests([action.payload, ...state.outcomingRequests]);
      state.outcomingRequestCount = state.outcomingRequests.length;
    },

    removeOutcomingRequest: (state: ContactsState, action: PayloadAction<string>) => {
      state.outcomingRequests = state.outcomingRequests.filter((request) => request.recipientId !== action.payload);
      state.outcomingRequestCount = state.outcomingRequests.length;
    },

    setOutcomingRequestCount: (state: ContactsState, action: PayloadAction<number>) => {
      state.outcomingRequestCount = action.payload;
    },

    setRelationsInitialized: (state: ContactsState, action: PayloadAction<boolean>) => {
      state.relationsInitialized = action.payload;
    },

    setIncomingRequestsInitialized: (state: ContactsState, action: PayloadAction<boolean>) => {
      state.incomingRequestsInitialized = action.payload;
    },

    setOutcomingRequestsInitialized: (state: ContactsState, action: PayloadAction<boolean>) => {
      state.outcomingRequestsInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchInfo
    */
    builder.addCase(ContactsActions.fetchInfoThunk.fulfilled, (state, action) => {
      const incomingRequestCountAction = {...action, payload: action.payload.incomingRequestCount};
      const outcomingRequestCountAction = {...action, payload: action.payload.outcomingRequestCount};
      contactsSlice.caseReducers.setRelationCount(state, {...action, payload: action.payload.relationCount});
      contactsSlice.caseReducers.setIncomingRequestCount(state, incomingRequestCountAction);
      contactsSlice.caseReducers.setOutcomingRequestCount(state, outcomingRequestCountAction);
    });

    /*
    fetchRelations
    */
    builder.addCase(ContactsActions.fetchRelationsThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.setRelations(state, action);
      contactsSlice.caseReducers.setRelationsInitialized(state, {...action, payload: true});
    });

    /*
    fetchIncomingRequests
    */
    builder.addCase(ContactsActions.fetchIncomingRequestsThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.setIncomingRequests(state, action);
      contactsSlice.caseReducers.setIncomingRequestsInitialized(state, {...action, payload: true});
    });

    /*
    fetchOutcomingRequests
    */
    builder.addCase(ContactsActions.fetchOutcomingRequestsThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.setOutcomingRequests(state, action);
      contactsSlice.caseReducers.setOutcomingRequestsInitialized(state, {...action, payload: true});
    });

    /*
    removeRelation
    */
    builder.addCase(ContactsActions.removeRelationThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.removeRelation(state, action);
    });

    /*
    sendRequest
    */
    builder.addCase(ContactsActions.sendRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.addOutcomingRequest(state, action);
    });

    /*
    acceptIncomingRequest
    */
    builder.addCase(ContactsActions.acceptIncomingRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.removeIncomingRequest(state, {...action, payload: action.payload.secondUserId});
      contactsSlice.caseReducers.addRelation(state, action);
    });

    /*
    declineIncomingRequest
    */
    builder.addCase(ContactsActions.declineIncomingRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.removeIncomingRequest(state, action);
    });

    /*
    removeOutcomingRequest
    */
    builder.addCase(ContactsActions.removeOutcomingRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.removeOutcomingRequest(state, action);
    });
  },
});

const filterRelations = (relations: ContactRelation[]): ContactRelation[] => {
  return relations.filter(FilterUtils.uniqueBySecondUserIdFilter);
};

const filterIncomingRequests = (relations: ContactRequest[]): ContactRequest[] => {
  return relations.filter(FilterUtils.uniqueByRequesterIdFilter);
};

const filterOutcomingRequests = (relations: ContactRequest[]): ContactRequest[] => {
  return relations.filter(FilterUtils.uniqueByRecipientIdFilter);
};

export default contactsSlice;
