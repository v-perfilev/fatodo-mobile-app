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
  loading: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    reset: (state: ContactsState) => {
      Object.assign(state, initialState);
    },

    addRelation: (state: ContactsState, action: PayloadAction<ContactRelation>) => {
      const relation = action.payload;
      state.relations = [...state.relations, relation];
      state.relationCount = state.relationCount + 1;
    },

    removeRelation: (state: ContactsState, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.relations = state.relations.filter((relation) => relation.secondUserId !== userId);
      state.relationCount = state.relationCount - 1;
    },

    addIncomingRequest: (state: ContactsState, action: PayloadAction<ContactRequest>) => {
      const request = action.payload;
      state.incomingRequests = [...state.incomingRequests, request];
      state.incomingRequestCount = state.incomingRequestCount + 1;
    },

    removeIncomingRequest: (state: ContactsState, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.incomingRequests = state.incomingRequests.filter((request) => request.requesterId !== userId);
      state.incomingRequestCount = state.incomingRequestCount - 1;
    },

    addOutcomingRequest: (state: ContactsState, action: PayloadAction<ContactRequest>) => {
      const request = action.payload;
      state.incomingRequests = [...state.outcomingRequests, request];
      state.incomingRequestCount = state.outcomingRequestCount + 1;
    },

    removeOutcomingRequest: (state: ContactsState, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.incomingRequests = state.outcomingRequests.filter((request) => request.recipientId !== userId);
      state.incomingRequestCount = state.outcomingRequestCount - 1;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchInfo
    */
    builder.addCase(ContactsActions.fetchInfoThunk.pending, (state: ContactsState) => {
      state.loading = true;
    });
    builder.addCase(ContactsActions.fetchInfoThunk.fulfilled, (state: ContactsState, action) => {
      state.relationCount = action.payload.relationCount;
      state.outcomingRequestCount = action.payload.outcomingRequestCount;
      state.incomingRequestCount = action.payload.incomingRequestCount;
      state.loading = false;
    });
    builder.addCase(ContactsActions.fetchInfoThunk.rejected, (state: ContactsState) => {
      state.loading = false;
    });

    /*
    fetchRelations
    */
    builder.addCase(ContactsActions.fetchRelationsThunk.pending, (state: ContactsState) => {
      state.loading = true;
    });
    builder.addCase(ContactsActions.fetchRelationsThunk.fulfilled, (state: ContactsState, action) => {
      state.relations = action.payload;
      state.loading = false;
    });
    builder.addCase(ContactsActions.fetchRelationsThunk.rejected, (state: ContactsState) => {
      state.loading = false;
    });

    /*
    fetchOutcomingRequests
    */
    builder.addCase(ContactsActions.fetchOutcomingRequestsThunk.pending, (state: ContactsState) => {
      state.loading = true;
    });
    builder.addCase(ContactsActions.fetchOutcomingRequestsThunk.fulfilled, (state: ContactsState, action) => {
      state.outcomingRequests = action.payload;
      state.loading = false;
    });
    builder.addCase(ContactsActions.fetchOutcomingRequestsThunk.rejected, (state: ContactsState) => {
      state.loading = false;
    });

    /*
    fetchIncomingRequests
    */
    builder.addCase(ContactsActions.fetchIncomingRequestsThunk.pending, (state: ContactsState) => {
      state.loading = true;
    });
    builder.addCase(ContactsActions.fetchIncomingRequestsThunk.fulfilled, (state: ContactsState, action) => {
      state.incomingRequests = action.payload;
      state.loading = false;
    });
    builder.addCase(ContactsActions.fetchIncomingRequestsThunk.rejected, (state: ContactsState) => {
      state.loading = false;
    });
  },
});

export default contactsSlice;
