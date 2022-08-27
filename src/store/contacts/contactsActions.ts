import contactsSlice from './contactsSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ContactService from '../../services/ContactService';
import {ContactRequestDTO} from '../../models/dto/ContactRequestDTO';
import {ContactUtils} from '../../shared/utils/ContactUtils';
import snackSlice from '../snack/snackSlice';
import {InfoActions} from '../info/infoActions';
import {AppDispatch, RootState} from '../store';
import {ContactRelation} from '../../models/Contact';
import eventsSlice from '../events/eventsSlice';

const PREFIX = 'contacts/';

export class ContactsActions {
  static addIncomingRequest = (requesterId: string) => async (dispatch: AppDispatch) => {
    const request = ContactUtils.createStubIncomingRequest(requesterId);
    dispatch(contactsSlice.actions.addIncomingRequest(request));
    dispatch(InfoActions.handleUserIdsThunk([requesterId]));
  };

  static addOutcomingRequest = (recipientId: string) => async (dispatch: AppDispatch) => {
    const request = ContactUtils.createStubOutcomingRequest(recipientId);
    dispatch(contactsSlice.actions.addOutcomingRequest(request));
    dispatch(InfoActions.handleUserIdsThunk([recipientId]));
  };

  static acceptIncomingRequest = (requesterId: string) => async (dispatch: AppDispatch) => {
    const relation = ContactUtils.createStubRelation(requesterId);
    dispatch(eventsSlice.actions.removeContactEvents(requesterId));
    dispatch(contactsSlice.actions.removeIncomingRequest(requesterId));
    dispatch(contactsSlice.actions.addRelation(relation));
    dispatch(InfoActions.handleUserIdsThunk([requesterId]));
  };

  static acceptOutcomingRequest = (recipientId: string) => async (dispatch: AppDispatch) => {
    const relation = ContactUtils.createStubRelation(recipientId);
    dispatch(eventsSlice.actions.removeContactEvents(recipientId));
    dispatch(contactsSlice.actions.removeOutcomingRequest(recipientId));
    dispatch(contactsSlice.actions.addRelation(relation));
    dispatch(InfoActions.handleUserIdsThunk([recipientId]));
  };

  static removeRelation = (secondUserId: string) => async (dispatch: AppDispatch) => {
    dispatch(eventsSlice.actions.removeContactEvents(secondUserId));
    dispatch(contactsSlice.actions.removeRelation(secondUserId));
  };

  static removeIncomingRequest = (requesterId: string) => async (dispatch: AppDispatch) => {
    dispatch(eventsSlice.actions.removeContactEvents(requesterId));
    dispatch(contactsSlice.actions.removeIncomingRequest(requesterId));
  };

  static removeOutcomingRequest = (recipientId: string) => async (dispatch: AppDispatch) => {
    dispatch(eventsSlice.actions.removeContactEvents(recipientId));
    dispatch(contactsSlice.actions.removeOutcomingRequest(recipientId));
  };

  static fetchInfoThunk = createAsyncThunk(PREFIX + 'fetchInfo', async () => {
    const response = await ContactService.getInfo();
    return response.data;
  });

  static fetchRelationsThunk = createAsyncThunk(PREFIX + 'fetchRelations', async (_, thunkAPI) => {
    const response = await ContactService.getRelations();
    const relationUserIds = response.data.map((r) => r.secondUserId);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(relationUserIds));
    return response.data;
  });

  static fetchOutcomingRequestsThunk = createAsyncThunk(PREFIX + 'fetchOutcomingRequests', async (_, thunkAPI) => {
    const response = await ContactService.getOutcomingRequests();
    const requestUserIds = response.data.map((r) => r.recipientId);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(requestUserIds));
    return response.data;
  });

  static fetchIncomingRequestsThunk = createAsyncThunk(PREFIX + 'fetchIncomingRequests', async (_, thunkAPI) => {
    const response = await ContactService.getIncomingRequests();
    const requestUserIds = response.data.map((r) => r.requesterId);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(requestUserIds));
    return response.data;
  });

  static removeRelationThunk = createAsyncThunk(PREFIX + 'removeRelation', async (userId: string, thunkAPI) => {
    await ContactService.removeRelation(userId);
    thunkAPI.dispatch(eventsSlice.actions.removeContactEvents(userId));
    thunkAPI.dispatch(contactsSlice.actions.removeRelation(userId));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'contact.relationRemoved', variant: 'info'}));
  });

  static sendRequestThunk = createAsyncThunk(PREFIX + 'sendRequest', async (dto: ContactRequestDTO, thunkAPI) => {
    await ContactService.sendRequest(dto);
    const request = ContactUtils.createStubOutcomingRequest(dto.recipientId);
    thunkAPI.dispatch(contactsSlice.actions.addOutcomingRequest(request));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'contact.requestSent', variant: 'info'}));
  });

  static acceptIncomingRequestThunk = createAsyncThunk(
    PREFIX + 'acceptIncomingRequest',
    async (userId: string, thunkAPI) => {
      await ContactService.acceptRequest(userId);
      const relation = ContactUtils.createStubRelation(userId);
      thunkAPI.dispatch(eventsSlice.actions.removeContactEvents(userId));
      thunkAPI.dispatch(contactsSlice.actions.addRelation(relation));
      thunkAPI.dispatch(contactsSlice.actions.removeIncomingRequest(userId));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'contact.requestAccepted', variant: 'info'}));
    },
  );

  static declineIncomingRequestThunk = createAsyncThunk(
    PREFIX + 'declineIncomingRequest',
    async (userId: string, thunkAPI) => {
      await ContactService.declineRequest(userId);
      thunkAPI.dispatch(eventsSlice.actions.removeContactEvents(userId));
      thunkAPI.dispatch(contactsSlice.actions.removeIncomingRequest(userId));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'contact.requestDeclined', variant: 'info'}));
    },
  );

  static removeOutcomingRequestThunk = createAsyncThunk(
    PREFIX + 'removeOutcomingRequest',
    async (userId: string, thunkAPI) => {
      await ContactService.removeRequest(userId);
      thunkAPI.dispatch(eventsSlice.actions.removeContactEvents(userId));
      thunkAPI.dispatch(contactsSlice.actions.removeOutcomingRequest(userId));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'contact.requestRemoved', variant: 'info'}));
    },
  );

  static removeRelationAction = createAsyncThunk(
    PREFIX + 'removeRelationAction',
    async (relation: ContactRelation, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const account = state.auth.account;
      const userIdToDelete = [relation.firstUserId, relation.secondUserId].find((userId) => userId !== account.id);
      if (userIdToDelete) {
        thunkAPI.dispatch(eventsSlice.actions.removeContactEvents(userIdToDelete));
        thunkAPI.dispatch(contactsSlice.actions.removeRelation(userIdToDelete));
      }
    },
  );
}
