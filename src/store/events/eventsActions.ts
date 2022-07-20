import {createAsyncThunk} from '@reduxjs/toolkit';
import EventService from '../../services/EventService';

enum TYPES {
  FETCH_EVENTS = 'events/fetchEvents',
  FETCH_UNREAD_COUNT = 'events/getUnreadCount',
  REFRESH_UNREAD_COUNT = 'events/refreshUnreadCount',
}

export class EventsThunks {
  static fetchEvents = createAsyncThunk(TYPES.FETCH_EVENTS, async (offset?: number) => {
    const response = await EventService.getEventsPageable(offset);
    return response.data;
  });

  static fetchUnreadCount = createAsyncThunk(TYPES.FETCH_UNREAD_COUNT, async () => {
    const response = await EventService.getUnreadCount();
    return response.data;
  });

  static refreshUnreadCount = createAsyncThunk(TYPES.REFRESH_UNREAD_COUNT, async () => {
    await EventService.refresh();
  });
}
