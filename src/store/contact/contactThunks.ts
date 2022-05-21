import {createAsyncThunk} from '@reduxjs/toolkit';
import ContactService from '../../services/ContactService';

enum TYPES {
  FETCH_INFO = 'contact/fetchInfo',
  FETCH_RELATIONS = 'contact/fetchRelations',
  FETCH_OUTCOMING_REQUESTS = 'contact/fetchOutcomingRequests',
  FETCH_INCOMING_REQUESTS = 'contact/fetchIncomingRequests',
  REMOVE_RELATION = 'contact/removeRelation',
  ACCEPT_INCOMING_REQUEST = 'contact/acceptIncomingRequest',
  DECLINE_INCOMING_REQUEST = 'contact/declineIncomingRequest',
  REMOVE_OUTCOMING_REQUEST = 'contact/removeOutcomingRequest',
}

export class ContactThunks {
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

  static removeRelation = createAsyncThunk(TYPES.REMOVE_RELATION, async (userId: string) => {
    await ContactService.removeRelation(userId);
    return userId;
  });

  static acceptIncomingRequest = createAsyncThunk(TYPES.ACCEPT_INCOMING_REQUEST, async (userId: string) => {
    await ContactService.acceptRequest(userId);
    return userId;
  });

  static declineIncomingRequest = createAsyncThunk(TYPES.DECLINE_INCOMING_REQUEST, async (userId: string) => {
    await ContactService.declineRequest(userId);
    return userId;
  });

  static removeOutcomingRequest = createAsyncThunk(TYPES.REMOVE_OUTCOMING_REQUEST, async (userId: string) => {
    await ContactService.declineRequest(userId);
    return userId;
  });
}

export default ContactThunks;
