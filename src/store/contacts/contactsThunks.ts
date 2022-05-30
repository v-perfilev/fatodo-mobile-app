import {createAsyncThunk} from '@reduxjs/toolkit';
import ContactService from '../../services/ContactService';
import {ContactRequestDTO} from '../../models/dto/ContactRequestDTO';
import SnackActions from '../snack/snackActions';
import {ContactRequest} from '../../models/ContactRequest';
import {ContactRelation} from '../../models/ContactRelation';
import ContactsActions from './contactsActions';

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

class ContactsThunks {
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
    thunkAPI.dispatch(ContactsActions.removeRelation(userId));
    thunkAPI.dispatch(SnackActions.handleCode('contact.relationRemoved', 'info'));
  });

  static sendRequest = createAsyncThunk(TYPES.SEND_REQUEST, async (dto: ContactRequestDTO, thunkAPI) => {
    await ContactService.sendRequest(dto);
    const request = {id: undefined, requesterId: undefined, recipientId: dto.recipientId} as ContactRequest;
    thunkAPI.dispatch(ContactsActions.addOutcomingRequest(request));
    thunkAPI.dispatch(SnackActions.handleCode('contact.requestSent', 'info'));
  });

  static acceptIncomingRequest = createAsyncThunk(TYPES.ACCEPT_INCOMING_REQUEST, async (userId: string, thunkAPI) => {
    await ContactService.acceptRequest(userId);
    const relation = {id: undefined, firstUserId: undefined, secondUserId: userId} as ContactRelation;
    thunkAPI.dispatch(ContactsActions.addRelation(relation));
    thunkAPI.dispatch(ContactsActions.removeIncomingRequest(userId));
    thunkAPI.dispatch(SnackActions.handleCode('contact.requestAccepted', 'info'));
  });

  static declineIncomingRequest = createAsyncThunk(TYPES.DECLINE_INCOMING_REQUEST, async (userId: string, thunkAPI) => {
    await ContactService.declineRequest(userId);
    thunkAPI.dispatch(ContactsActions.removeIncomingRequest(userId));
    thunkAPI.dispatch(SnackActions.handleCode('contact.requestDeclined', 'info'));
  });

  static removeOutcomingRequest = createAsyncThunk(TYPES.REMOVE_OUTCOMING_REQUEST, async (userId: string, thunkAPI) => {
    await ContactService.removeRequest(userId);
    thunkAPI.dispatch(ContactsActions.removeOutcomingRequest(userId));
    thunkAPI.dispatch(SnackActions.handleCode('contact.requestRemoved', 'info'));
  });
}

export default ContactsThunks;
