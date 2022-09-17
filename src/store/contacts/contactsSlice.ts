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

    setRelationCounter: (state: ContactsState, action: PayloadAction<number>) => {
      state.relationCount = action.payload;
    },

    incrementRelationCounter: (state: ContactsState) => {
      state.relationCount = state.relationCount + 1;
    },

    decrementRelationCounter: (state: ContactsState) => {
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

    setIncomingRequestCounter: (state: ContactsState, action: PayloadAction<number>) => {
      state.incomingRequestCount = action.payload;
    },

    incrementIncomingRequestCounter: (state: ContactsState) => {
      state.incomingRequestCount = state.incomingRequestCount + 1;
    },

    decrementIncomingRequestCounter: (state: ContactsState) => {
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

    setOutcomingRequestCounter: (state: ContactsState, action: PayloadAction<number>) => {
      state.outcomingRequestCount = action.payload;
    },

    incrementOutcomingRequestCounter: (state: ContactsState) => {
      state.outcomingRequestCount = state.outcomingRequestCount + 1;
    },

    decrementOutcomingRequestCounter: (state: ContactsState) => {
      state.outcomingRequestCount = state.outcomingRequestCount - 1;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchInfo
    */
    builder.addCase(ContactsActions.fetchInfoThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.setRelationCounter(state, {...action, payload: action.payload.relationCount});
      contactsSlice.caseReducers.setIncomingRequestCounter(state, {
        ...action,
        payload: action.payload.incomingRequestCount,
      });
      contactsSlice.caseReducers.setOutcomingRequestCounter(state, {
        ...action,
        payload: action.payload.outcomingRequestCount,
      });
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
      contactsSlice.caseReducers.decrementRelationCounter(state);
    });

    /*
    sendRequest
    */
    builder.addCase(ContactsActions.sendRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.addOutcomingRequest(state, action);
      contactsSlice.caseReducers.incrementOutcomingRequestCounter(state);
    });

    /*
    acceptIncomingRequest
    */
    builder.addCase(ContactsActions.acceptIncomingRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.removeIncomingRequest(state, {...action, payload: action.payload.secondUserId});
      contactsSlice.caseReducers.decrementIncomingRequestCounter(state);
      contactsSlice.caseReducers.addRelation(state, action);
      contactsSlice.caseReducers.incrementRelationCounter(state);
    });

    /*
    declineIncomingRequest
    */
    builder.addCase(ContactsActions.declineIncomingRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.removeIncomingRequest(state, action);
      contactsSlice.caseReducers.decrementIncomingRequestCounter(state);
    });

    /*
    removeOutcomingRequest
    */
    builder.addCase(ContactsActions.removeOutcomingRequestThunk.fulfilled, (state, action) => {
      contactsSlice.caseReducers.removeOutcomingRequest(state, action);
      contactsSlice.caseReducers.decrementIncomingRequestCounter(state);
    });
  },
});

export default contactsSlice;
