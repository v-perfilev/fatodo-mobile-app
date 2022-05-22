import {createSlice} from '@reduxjs/toolkit';
import {ContactsState} from './contactsType';
import ContactsThunks from './contactsThunks';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {ContactRelation} from '../../models/ContactRelation';
import {ContactRequest} from '../../models/ContactRequest';

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
      const relation = {id: undefined, firstUserId: undefined, secondUserId: action.payload} as ContactRelation;
      const relationCount = state.relationCount + 1;
      const relations = ArrayUtils.addValue(state.relations, relation);
      return {...state, relationCount, relations};
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

    /*
    removeRelation
    */
    builder.addCase(ContactsThunks.removeRelation.fulfilled, (state: ContactsState, action) => {
      const relationCount = state.relationCount - 1;
      const relations = state.relations.filter((relation) => relation.secondUserId !== action.payload);
      return {...state, relationCount, relations};
    });

    /*
    sendRequest
    */
    builder.addCase(ContactsThunks.sendRequest.fulfilled, (state: ContactsState, action) => {
      const request = {id: undefined, requesterId: undefined, recipientId: action.payload} as ContactRequest;
      const outcomingRequestCount = state.outcomingRequestCount + 1;
      const outcomingRequests = ArrayUtils.addValue(state.outcomingRequests, request);
      return {...state, outcomingRequestCount, outcomingRequests};
    });

    /*
    acceptIncomingRequest
    */
    builder.addCase(ContactsThunks.acceptIncomingRequest.fulfilled, (state: ContactsState, action) => {
      const incomingRequestCount = state.incomingRequestCount - 1;
      const incomingRequests = state.incomingRequests.filter((request) => request.requesterId !== action.payload);
      return {...state, incomingRequestCount, incomingRequests};
    });

    /*
    declineIncomingRequest
    */
    builder.addCase(ContactsThunks.declineIncomingRequest.fulfilled, (state: ContactsState, action) => {
      const incomingRequestCount = state.incomingRequestCount - 1;
      const incomingRequests = state.incomingRequests.filter((request) => request.requesterId !== action.payload);
      return {...state, incomingRequestCount, incomingRequests};
    });

    /*
    removeOutcomingRequest
    */
    builder.addCase(ContactsThunks.removeOutcomingRequest.fulfilled, (state: ContactsState, action) => {
      const outcomingRequestCount = state.outcomingRequestCount - 1;
      const outcomingRequests = state.outcomingRequests.filter((request) => request.recipientId !== action.payload);
      return {...state, outcomingRequestCount, outcomingRequests};
    });
  },
});

export default contactsSlice;
