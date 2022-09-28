import contactsSlice from './contactsSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ContactService from '../../services/ContactService';
import {ContactRequestDTO} from '../../models/dto/ContactRequestDTO';
import {ContactUtils} from '../../shared/utils/ContactUtils';
import {InfoActions} from '../info/infoActions';
import {AppDispatch, AsyncThunkConfig} from '../store';
import {ContactInfo, ContactRelation, ContactRequest} from '../../models/Contact';
import {SnackActions} from '../snack/snackActions';

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
    dispatch(contactsSlice.actions.removeIncomingRequest(requesterId));
    dispatch(contactsSlice.actions.addRelation(relation));
    dispatch(InfoActions.handleUserIdsThunk([requesterId]));
  };

  static acceptOutcomingRequest = (recipientId: string) => async (dispatch: AppDispatch) => {
    const relation = ContactUtils.createStubRelation(recipientId);
    dispatch(contactsSlice.actions.removeOutcomingRequest(recipientId));
    dispatch(contactsSlice.actions.addRelation(relation));
    dispatch(InfoActions.handleUserIdsThunk([recipientId]));
  };

  static removeRelation = (secondUserId: string) => async (dispatch: AppDispatch) => {
    dispatch(contactsSlice.actions.removeRelation(secondUserId));
  };

  static removeIncomingRequest = (requesterId: string) => async (dispatch: AppDispatch) => {
    dispatch(contactsSlice.actions.removeIncomingRequest(requesterId));
  };

  static removeOutcomingRequest = (recipientId: string) => async (dispatch: AppDispatch) => {
    dispatch(contactsSlice.actions.removeOutcomingRequest(recipientId));
  };

  static fetchInfoThunk = createAsyncThunk<ContactInfo, void, AsyncThunkConfig>(PREFIX + 'fetchInfo', async () => {
    const response = await ContactService.getInfo();
    return response.data;
  });

  static fetchRelationsThunk = createAsyncThunk<ContactRelation[], void, AsyncThunkConfig>(
    PREFIX + 'fetchRelations',
    async (_, thunkAPI) => {
      const response = await ContactService.getRelations();
      const relationUserIds = response.data.map((r) => r.secondUserId);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(relationUserIds));
      return response.data;
    },
  );

  static fetchOutcomingRequestsThunk = createAsyncThunk<ContactRequest[], void, AsyncThunkConfig>(
    PREFIX + 'fetchOutcomingRequests',
    async (_, thunkAPI) => {
      const response = await ContactService.getOutcomingRequests();
      const requestUserIds = response.data.map((r) => r.recipientId);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(requestUserIds));
      return response.data;
    },
  );

  static fetchIncomingRequestsThunk = createAsyncThunk<ContactRequest[], void, AsyncThunkConfig>(
    PREFIX + 'fetchIncomingRequests',
    async (_, thunkAPI) => {
      const response = await ContactService.getIncomingRequests();
      const requestUserIds = response.data.map((r) => r.requesterId);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(requestUserIds));
      return response.data;
    },
  );

  static removeRelationThunk = createAsyncThunk<string, string, AsyncThunkConfig>(
    PREFIX + 'removeRelation',
    async (userId, thunkAPI) => {
      await ContactService.removeRelation(userId);
      thunkAPI.dispatch(SnackActions.handleCode('contact.relationRemoved', 'info'));
      return userId;
    },
  );

  static sendRequestThunk = createAsyncThunk<ContactRequest, ContactRequestDTO, AsyncThunkConfig>(
    PREFIX + 'sendRequest',
    async (dto, thunkAPI) => {
      await ContactService.sendRequest(dto);
      const request = ContactUtils.createStubOutcomingRequest(dto.recipientId);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk([dto.recipientId]));
      thunkAPI.dispatch(SnackActions.handleCode('contact.requestSent', 'info'));
      return request;
    },
  );

  static acceptIncomingRequestThunk = createAsyncThunk<ContactRelation, string, AsyncThunkConfig>(
    PREFIX + 'acceptIncomingRequest',
    async (userId, thunkAPI) => {
      await ContactService.acceptRequest(userId);
      const relation = ContactUtils.createStubRelation(userId);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk([userId]));
      thunkAPI.dispatch(SnackActions.handleCode('contact.requestAccepted', 'info'));
      return relation;
    },
  );

  static declineIncomingRequestThunk = createAsyncThunk<string, string, AsyncThunkConfig>(
    PREFIX + 'declineIncomingRequest',
    async (userId, thunkAPI) => {
      await ContactService.declineRequest(userId);
      thunkAPI.dispatch(SnackActions.handleCode('contact.requestDeclined', 'info'));
      return userId;
    },
  );

  static removeOutcomingRequestThunk = createAsyncThunk<string, string, AsyncThunkConfig>(
    PREFIX + 'removeOutcomingRequest',
    async (userId, thunkAPI) => {
      await ContactService.removeRequest(userId);
      thunkAPI.dispatch(SnackActions.handleCode('contact.requestRemoved', 'info'));
      return userId;
    },
  );
}
