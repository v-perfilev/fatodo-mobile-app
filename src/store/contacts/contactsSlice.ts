import {createSlice} from '@reduxjs/toolkit';
import {ContactsState} from './contactsType';
import ContactsThunks from './contactsThunks';

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
  reducers: {},
  extraReducers: (builder) => {
    /*
    fetchInfo
    */
    builder.addCase(ContactsThunks.fetchInfo.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactsThunks.fetchInfo.fulfilled, (state, action) => ({
      ...state,
      relationCount: action.payload.relationCount,
      outcomingRequestCount: action.payload.outcomingRequestCount,
      incomingRequestCount: action.payload.incomingRequestCount,
      loading: false,
    }));
    builder.addCase(ContactsThunks.fetchInfo.rejected, (state) => ({
      ...state,
      loading: false,
    }));

    /*
    fetchRelations
    */
    builder.addCase(ContactsThunks.fetchRelations.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactsThunks.fetchRelations.fulfilled, (state, action) => ({
      ...state,
      relations: action.payload,
      loading: false,
    }));
    builder.addCase(ContactsThunks.fetchRelations.rejected, (state) => ({
      ...state,
      loading: false,
    }));

    /*
    fetchOutcomingRequests
    */
    builder.addCase(ContactsThunks.fetchOutcomingRequests.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactsThunks.fetchOutcomingRequests.fulfilled, (state, action) => ({
      ...state,
      outcomingRequests: action.payload,
      loading: false,
    }));
    builder.addCase(ContactsThunks.fetchOutcomingRequests.rejected, (state) => ({
      ...state,
      loading: false,
    }));

    /*
    fetchIncomingRequests
    */
    builder.addCase(ContactsThunks.fetchIncomingRequests.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactsThunks.fetchIncomingRequests.fulfilled, (state, action) => ({
      ...state,
      incomingRequests: action.payload,
      loading: false,
    }));
    builder.addCase(ContactsThunks.fetchIncomingRequests.rejected, (state) => ({
      ...state,
      loading: false,
    }));

    /*
    removeRelation
    */
    builder.addCase(ContactsThunks.removeRelation.fulfilled, (state, action) => {
      const relationCount = state.relationCount - 1;
      const relations = state.relations.filter((relation) => relation.secondUserId !== action.payload);
      return {...state, relationCount, relations};
    });

    /*
    acceptIncomingRequest
    */
    builder.addCase(ContactsThunks.acceptIncomingRequest.fulfilled, (state, action) => {
      const relationCount = state.relationCount + 1;
      const incomingRequestCount = state.incomingRequestCount - 1;
      const relations = state.relations;
      relations.push({id: undefined, firstUserId: undefined, secondUserId: action.payload});
      const incomingRequests = state.incomingRequests.filter((request) => request.requesterId !== action.payload);
      return {...state, relationCount, incomingRequestCount, relations, incomingRequests};
    });

    /*
    declineIncomingRequest
    */
    builder.addCase(ContactsThunks.declineIncomingRequest.fulfilled, (state, action) => {
      const incomingRequestCount = state.incomingRequestCount - 1;
      const incomingRequests = state.incomingRequests.filter((request) => request.requesterId !== action.payload);
      return {...state, incomingRequestCount, incomingRequests};
    });

    /*
    removeOutcomingRequest
    */
    builder.addCase(ContactsThunks.removeOutcomingRequest.fulfilled, (state, action) => {
      const outcomingRequestCount = state.outcomingRequestCount - 1;
      const outcomingRequests = state.outcomingRequests.filter((request) => request.recipientId !== action.payload);
      return {...state, outcomingRequestCount, outcomingRequests};
    });
  },
});

export default contactsSlice;
