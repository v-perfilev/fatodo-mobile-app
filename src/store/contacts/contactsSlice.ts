import {createSlice} from '@reduxjs/toolkit';
import {ContactsState} from './contactsType';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {ContactRelation} from '../../models/ContactRelation';
import {ContactRequest} from '../../models/ContactRequest';
import {ContactsThunks} from './contactsActions';

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
    addRelation: (state: ContactsState, action) => {
      const relation = action.payload as ContactRelation;
      const relations = ArrayUtils.addValueToEnd(state.relations, relation);
      const relationCount = state.relationCount + 1;
      return {...state, relations, relationCount};
    },

    removeRelation: (state: ContactsState, action) => {
      const userId = action.payload as string;
      const relations = state.relations.filter((relation) => relation.secondUserId !== userId);
      const relationCount = state.relationCount - 1;
      return {...state, relationCount, relations};
    },

    addIncomingRequest: (state: ContactsState, action) => {
      const request = action.payload as ContactRequest;
      const incomingRequests = ArrayUtils.addValueToEnd(state.incomingRequests, request);
      const incomingRequestCount = state.incomingRequestCount + 1;
      return {...state, incomingRequests, incomingRequestCount};
    },

    removeIncomingRequest: (state: ContactsState, action) => {
      const userId = action.payload as string;
      const incomingRequests = state.incomingRequests.filter((request) => request.requesterId !== userId);
      const incomingRequestCount = state.incomingRequestCount - 1;
      return {...state, incomingRequests, incomingRequestCount};
    },

    addOutcomingRequest: (state: ContactsState, action) => {
      const request = action.payload as ContactRequest;
      const incomingRequests = ArrayUtils.addValueToEnd(state.outcomingRequests, request);
      const incomingRequestCount = state.outcomingRequestCount + 1;
      return {...state, incomingRequests, incomingRequestCount};
    },

    removeOutcomingRequest: (state: ContactsState, action) => {
      const userId = action.payload as string;
      const incomingRequests = state.outcomingRequests.filter((request) => request.recipientId !== userId);
      const incomingRequestCount = state.outcomingRequestCount - 1;
      return {...state, incomingRequests, incomingRequestCount};
    },
  },
  extraReducers: (builder) => {
    /*
    fetchInfo
    */
    builder.addCase(ContactsThunks.fetchInfo.pending, (state: ContactsState) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactsThunks.fetchInfo.fulfilled, (state: ContactsState, action) => ({
      ...state,
      relationCount: action.payload.relationCount,
      outcomingRequestCount: action.payload.outcomingRequestCount,
      incomingRequestCount: action.payload.incomingRequestCount,
      loading: false,
    }));
    builder.addCase(ContactsThunks.fetchInfo.rejected, (state: ContactsState) => ({
      ...state,
      loading: false,
    }));

    /*
    fetchRelations
    */
    builder.addCase(ContactsThunks.fetchRelations.pending, (state: ContactsState) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactsThunks.fetchRelations.fulfilled, (state: ContactsState, action) => ({
      ...state,
      relations: action.payload,
      loading: false,
    }));
    builder.addCase(ContactsThunks.fetchRelations.rejected, (state: ContactsState) => ({
      ...state,
      loading: false,
    }));

    /*
    fetchOutcomingRequests
    */
    builder.addCase(ContactsThunks.fetchOutcomingRequests.pending, (state: ContactsState) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactsThunks.fetchOutcomingRequests.fulfilled, (state: ContactsState, action) => ({
      ...state,
      outcomingRequests: action.payload,
      loading: false,
    }));
    builder.addCase(ContactsThunks.fetchOutcomingRequests.rejected, (state: ContactsState) => ({
      ...state,
      loading: false,
    }));

    /*
    fetchIncomingRequests
    */
    builder.addCase(ContactsThunks.fetchIncomingRequests.pending, (state: ContactsState) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactsThunks.fetchIncomingRequests.fulfilled, (state: ContactsState, action) => ({
      ...state,
      incomingRequests: action.payload,
      loading: false,
    }));
    builder.addCase(ContactsThunks.fetchIncomingRequests.rejected, (state: ContactsState) => ({
      ...state,
      loading: false,
    }));
  },
});

export default contactsSlice;
