import {createAsyncThunk} from '@reduxjs/toolkit';
import ContactService from '../../services/ContactService';
import {ContactRequestDTO} from '../../models/dto/ContactRequestDTO';

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

  static removeRelation = createAsyncThunk(TYPES.REMOVE_RELATION, async (userId: string) => {
    await ContactService.removeRelation(userId);
    return userId;
  });

  static sendRequest = createAsyncThunk(TYPES.SEND_REQUEST, async (dto: ContactRequestDTO) => {
    await ContactService.sendRequest(dto);
    return dto.recipientId;
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
    await ContactService.removeRequest(userId);
    return userId;
  });
}

export default ContactsThunks;
