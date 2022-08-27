import contactsSlice from './contactsSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ContactService from '../../services/ContactService';
import {ContactRequestDTO} from '../../models/dto/ContactRequestDTO';
import {ContactUtils} from '../../shared/utils/ContactUtils';
import snackSlice from '../snack/snackSlice';
import {InfoThunks} from '../info/infoActions';
import {AppDispatch, RootState} from '../store';
import {ContactRelation} from '../../models/Contact';

export class ContactsActions {
  static addIncomingRequest = (requesterId: string) => async (dispatch: AppDispatch) => {
    const request = ContactUtils.createStubIncomingRequest(requesterId);
    dispatch(contactsSlice.actions.addIncomingRequest(request));
    dispatch(InfoThunks.handleUserIds([requesterId]));
  };

  static addOutcomingRequest = (recipientId: string) => async (dispatch: AppDispatch) => {
    const request = ContactUtils.createStubOutcomingRequest(recipientId);
    dispatch(contactsSlice.actions.addOutcomingRequest(request));
    dispatch(InfoThunks.handleUserIds([recipientId]));
  };

  static acceptIncomingRequest = (requesterId: string) => async (dispatch: AppDispatch) => {
    const relation = ContactUtils.createStubRelation(requesterId);
    dispatch(contactsSlice.actions.removeIncomingRequest(requesterId));
    dispatch(contactsSlice.actions.addRelation(relation));
    dispatch(InfoThunks.handleUserIds([requesterId]));
  };

  static acceptOutcomingRequest = (recipientId: string) => async (dispatch: AppDispatch) => {
    const relation = ContactUtils.createStubRelation(recipientId);
    dispatch(contactsSlice.actions.removeOutcomingRequest(recipientId));
    dispatch(contactsSlice.actions.addRelation(relation));
    dispatch(InfoThunks.handleUserIds([recipientId]));
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
}

enum TYPES {
  FETCH_INFO = 'contacts/fetchInfo',
  FETCH_RELATIONS = 'contacts/fetchRelations',
  FETCH_OUTCOMING_REQUESTS = 'contacts/fetchOutcomingRequests',
  FETCH_INCOMING_REQUESTS = 'contacts/fetchIncomingRequests',
  REMOVE_RELATION = 'contacts/removeRelation',
  SEND_REQUEST = 'contacts/sendRequest',
  ACCEPT_INCOMING_REQUEST = 'contacts/acceptIncomingRequest',
  DECLINE_INCOMING_REQUEST = 'contacts/declineIncomingRequest',
  REMOVE_OUTCOMING_REQUEST = 'contacts/removeOutcomingRequest',
  REMOVE_RELATION_FROM_LIST = 'contacts/removeRelationFromList',
}

export class ContactsThunks {
  static fetchInfo = createAsyncThunk(TYPES.FETCH_INFO, async () => {
    const response = await ContactService.getInfo();
    return response.data;
  });

  static fetchRelations = createAsyncThunk(TYPES.FETCH_RELATIONS, async (_, thunkAPI) => {
    const response = await ContactService.getRelations();
    const relationUserIds = response.data.map((r) => r.secondUserId);
    thunkAPI.dispatch(InfoThunks.handleUserIds(relationUserIds));
    return response.data;
  });

  static fetchOutcomingRequests = createAsyncThunk(TYPES.FETCH_OUTCOMING_REQUESTS, async (_, thunkAPI) => {
    const response = await ContactService.getOutcomingRequests();
    const requestUserIds = response.data.map((r) => r.recipientId);
    thunkAPI.dispatch(InfoThunks.handleUserIds(requestUserIds));
    return response.data;
  });

  static fetchIncomingRequests = createAsyncThunk(TYPES.FETCH_INCOMING_REQUESTS, async (_, thunkAPI) => {
    const response = await ContactService.getIncomingRequests();
    const requestUserIds = response.data.map((r) => r.requesterId);
    thunkAPI.dispatch(InfoThunks.handleUserIds(requestUserIds));
    return response.data;
  });

  static removeRelation = createAsyncThunk(TYPES.REMOVE_RELATION, async (userId: string, thunkAPI) => {
    await ContactService.removeRelation(userId);
    thunkAPI.dispatch(contactsSlice.actions.removeRelation(userId));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'contact.relationRemoved', variant: 'info'}));
  });

  static sendRequest = createAsyncThunk(TYPES.SEND_REQUEST, async (dto: ContactRequestDTO, thunkAPI) => {
    await ContactService.sendRequest(dto);
    const request = ContactUtils.createStubOutcomingRequest(dto.recipientId);
    thunkAPI.dispatch(contactsSlice.actions.addOutcomingRequest(request));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'contact.requestSent', variant: 'info'}));
  });

  static acceptIncomingRequest = createAsyncThunk(TYPES.ACCEPT_INCOMING_REQUEST, async (userId: string, thunkAPI) => {
    await ContactService.acceptRequest(userId);
    const relation = ContactUtils.createStubRelation(userId);
    thunkAPI.dispatch(contactsSlice.actions.addRelation(relation));
    thunkAPI.dispatch(contactsSlice.actions.removeIncomingRequest(userId));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'contact.requestAccepted', variant: 'info'}));
  });

  static declineIncomingRequest = createAsyncThunk(TYPES.DECLINE_INCOMING_REQUEST, async (userId: string, thunkAPI) => {
    await ContactService.declineRequest(userId);
    thunkAPI.dispatch(contactsSlice.actions.removeIncomingRequest(userId));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'contact.requestDeclined', variant: 'info'}));
  });

  static removeOutcomingRequest = createAsyncThunk(TYPES.REMOVE_OUTCOMING_REQUEST, async (userId: string, thunkAPI) => {
    await ContactService.removeRequest(userId);
    thunkAPI.dispatch(contactsSlice.actions.removeOutcomingRequest(userId));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'contact.requestRemoved', variant: 'info'}));
  });

  static removeRelationFromList = createAsyncThunk(
    TYPES.REMOVE_RELATION_FROM_LIST,
    async (relation: ContactRelation, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const account = state.auth.account;
      const userIdToDelete = [relation.firstUserId, relation.secondUserId].find((userId) => userId !== account.id);
      if (userIdToDelete) {
        thunkAPI.dispatch(contactsSlice.actions.removeRelation(userIdToDelete));
      }
    },
  );
}
