import contactsSlice from './contactsSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ContactService from '../../services/ContactService';
import {ContactRequestDTO} from '../../models/dto/ContactRequestDTO';
import {ContactUtils} from '../../shared/utils/ContactUtils';
import snackSlice from '../snack/snackSlice';

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
}

export class ContactsThunks {
  static fetchInfo = createAsyncThunk(TYPES.FETCH_INFO, async () => {
    const response = await ContactService.getInfo();
    return response.data;
  });

  static fetchRelations = createAsyncThunk(TYPES.FETCH_RELATIONS, async () => {
    const response = await ContactService.getRelations();
    return response.data;
  });

  static fetchOutcomingRequests = createAsyncThunk(TYPES.FETCH_OUTCOMING_REQUESTS, async () => {
    const response = await ContactService.getOutcomingRequests();
    return response.data;
  });

  static fetchIncomingRequests = createAsyncThunk(TYPES.FETCH_INCOMING_REQUESTS, async () => {
    const response = await ContactService.getIncomingRequests();
    return response.data;
  });

  static removeRelation = createAsyncThunk(TYPES.REMOVE_RELATION, async (userId: string, thunkAPI) => {
    await ContactService.removeRelation(userId);
    thunkAPI.dispatch(contactsSlice.actions.removeRelation(userId));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'contact.relationRemoved', variant: 'info'}));
  });

  static sendRequest = createAsyncThunk(TYPES.SEND_REQUEST, async (dto: ContactRequestDTO, thunkAPI) => {
    await ContactService.sendRequest(dto);
    const request = ContactUtils.createStubRequest(dto.recipientId);
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
}
