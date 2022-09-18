import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ContactsState} from './contactsType';
import {ContactsActions} from './contactsActions';
import {ContactRelation, ContactRequest} from '../../models/Contact';

const initialState: ContactsState = {
  relationCount: 0,
  outcomingRequestCount: 0,
  incomingRequestCount: 0,
  relations: [],
  outcomingRequests: [],
  incomingRequests: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    reset: (state: ContactsState) => {
      Object.assign(state, initialState);
    },

    setRelations: (state: ContactsState, action: PayloadAction<ContactRelation[]>) => {
      state.relations = action.payload;
    },

    addRelation: (state: ContactsState, action: PayloadAction<ContactRelation>) => {
      state.relations = [action.payload, ...state.relations];
    },

    removeRelation: (state: ContactsState, action: PayloadAction<string>) => {
      state.relations = state.relations.filter((relation) => relation.secondUserId !== action.payload);
    },

    setRelationCount: (state: ContactsState, action: PayloadAction<number>) => {
      state.relationCount = action.payload;
    },

    incrementRelationCount: (state: ContactsState) => {
      state.relationCount = state.relationCount + 1;
    },

    decrementRelationCount: (state: ContactsState) => {
      state.relationCount = state.relationCount - 1;
    },

    setIncomingRequests: (state: ContactsState, action: PayloadAction<ContactRequest[]>) => {
      state.incomingRequests = action.payload;
    },

    addIncomingRequest: (state: ContactsState, action: PayloadAction<ContactRequest>) => {
      state.incomingRequests = [action.payload, ...state.incomingRequests];
    },

    removeIncomingRequest: (state: ContactsState, action: PayloadAction<string>) => {
      state.incomingRequests = state.incomingRequests.filter((request) => request.requesterId !== action.payload);
    },

    setIncomingRequestCount: (state: ContactsState, action: PayloadAction<number>) => {
      state.incomingRequestCount = action.payload;
    },

    incrementIncomingRequestCount: (state: ContactsState) => {
      state.incomingRequestCount = state.incomingRequestCount + 1;
    },

    decrementIncomingRequestCount: (state: ContactsState) => {
      state.incomingRequestCount = state.incomingRequestCount - 1;
    },

    setOutcomingRequests: (state: ContactsState, action: PayloadAction<ContactRequest[]>) => {
      state.outcomingRequests = action.payload;
    },

    addOutcomingRequest: (state: ContactsState, action: PayloadAction<ContactRequest>) => {
      state.outcomingRequests = [action.payload, ...state.outcomingRequests];
    },

    removeOutcomingRequest: (state: ContactsState, action: PayloadAction<string>) => {
      state.outcomingRequests = state.outcomingRequests.filter((request) => request.recipientId !== action.payload);
    },

    setOutcomingRequestCount: (state: ContactsState, action: PayloadAction<number>) => {
      state.outcomingRequestCount = action.payload;
    },

    incrementOutcomingRequestCount: (state: ContactsState) => {
      state.outcomingRequestCount = state.outcomingRequestCount + 1;
    },

    decrementOutcomingRequestCount: (state: ContactsState) => {
      state.outcomingRequestCount = state.outcomingRequestCount - 1;
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
    });

    /*
    fetchIncomingRequests
    */
    builder.addCase(ContactsActions.fetchIncomingRequestsThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.setIncomingRequests(state, action);
    });

    /*
    fetchOutcomingRequests
    */
    builder.addCase(ContactsActions.fetchOutcomingRequestsThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.setOutcomingRequests(state, action);
    });

    /*
    removeRelation
    */
    builder.addCase(ContactsActions.removeRelationThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.removeRelation(state, action);
      contactsSlice.caseReducers.decrementRelationCount(state);
    });

    /*
    sendRequest
    */
    builder.addCase(ContactsActions.sendRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.addOutcomingRequest(state, action);
      contactsSlice.caseReducers.incrementOutcomingRequestCount(state);
    });

    /*
    acceptIncomingRequest
    */
    builder.addCase(ContactsActions.acceptIncomingRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.removeIncomingRequest(state, {...action, payload: action.payload.secondUserId});
      contactsSlice.caseReducers.decrementIncomingRequestCount(state);
      contactsSlice.caseReducers.addRelation(state, action);
      contactsSlice.caseReducers.incrementRelationCount(state);
    });

    /*
    declineIncomingRequest
    */
    builder.addCase(ContactsActions.declineIncomingRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.removeIncomingRequest(state, action);
      contactsSlice.caseReducers.decrementIncomingRequestCount(state);
    });

    /*
    removeOutcomingRequest
    */
    builder.addCase(ContactsActions.removeOutcomingRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.removeOutcomingRequest(state, action);
      contactsSlice.caseReducers.decrementIncomingRequestCount(state);
    });
  },
});

export default contactsSlice;
