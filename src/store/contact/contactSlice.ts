import {createSlice} from '@reduxjs/toolkit';
import {ContactState} from './contactType';
import ContactThunks from './contactThunks';

const initialState: ContactState = {
  relationCount: 0,
  outcomingRequestCount: 0,
  incomingRequestCount: 0,
  relations: [],
  outcomingRequests: [],
  incomingRequests: [],
  loading: false,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*
    fetchInfo
    */
    builder.addCase(ContactThunks.fetchInfo.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactThunks.fetchInfo.fulfilled, (state, action) => ({
      ...state,
      relationCount: action.payload.relationCount,
      outcomingRequestCount: action.payload.outcomingRequestCount,
      incomingRequestCount: action.payload.incomingRequestCount,
      loading: false,
    }));
    builder.addCase(ContactThunks.fetchInfo.rejected, (state) => ({
      ...state,
      loading: false,
    }));

    /*
    fetchRelations
    */
    builder.addCase(ContactThunks.fetchRelations.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactThunks.fetchRelations.fulfilled, (state, action) => ({
      ...state,
      relations: action.payload,
      loading: false,
    }));
    builder.addCase(ContactThunks.fetchRelations.rejected, (state) => ({
      ...state,
      loading: false,
    }));

    /*
    fetchOutcomingRequests
    */
    builder.addCase(ContactThunks.fetchOutcomingRequests.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactThunks.fetchOutcomingRequests.fulfilled, (state, action) => ({
      ...state,
      outcomingRequests: action.payload,
      loading: false,
    }));
    builder.addCase(ContactThunks.fetchOutcomingRequests.rejected, (state) => ({
      ...state,
      loading: false,
    }));

    /*
    fetchIncomingRequests
    */
    builder.addCase(ContactThunks.fetchIncomingRequests.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ContactThunks.fetchIncomingRequests.fulfilled, (state, action) => ({
      ...state,
      incomingRequests: action.payload,
      loading: false,
    }));
    builder.addCase(ContactThunks.fetchIncomingRequests.rejected, (state) => ({
      ...state,
      loading: false,
    }));

    /*
    removeRelation
    */
    builder.addCase(ContactThunks.removeRelation.fulfilled, (state, action) => {
      const relationCount = state.relationCount - 1;
      const relations = state.relations.filter((relation) => relation.secondUserId !== action.payload);
      return {...state, relationCount, relations};
    });

    /*
    acceptIncomingRequest
    */
    builder.addCase(ContactThunks.acceptIncomingRequest.fulfilled, (state, action) => {
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
    builder.addCase(ContactThunks.declineIncomingRequest.fulfilled, (state, action) => {
      const incomingRequestCount = state.incomingRequestCount - 1;
      const incomingRequests = state.incomingRequests.filter((request) => request.requesterId !== action.payload);
      return {...state, incomingRequestCount, incomingRequests};
    });

    /*
    removeOutcomingRequest
    */
    builder.addCase(ContactThunks.removeOutcomingRequest.fulfilled, (state, action) => {
      const outcomingRequestCount = state.outcomingRequestCount - 1;
      const outcomingRequests = state.outcomingRequests.filter((request) => request.recipientId !== action.payload);
      return {...state, outcomingRequestCount, outcomingRequests};
    });
  },
});

export default contactSlice;
