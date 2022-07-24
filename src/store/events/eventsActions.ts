import {createAsyncThunk} from '@reduxjs/toolkit';
import EventService from '../../services/EventService';
import {EventUtils} from '../../shared/utils/EventUtils';
import {InfoThunks} from '../info/infoActions';

enum TYPES {
  FETCH_EVENTS = 'events/fetchEvents',
  FETCH_UNREAD_COUNT = 'events/getUnreadCount',
  REFRESH_UNREAD_COUNT = 'events/refreshUnreadCount',
}

export class EventsThunks {
  static fetchEvents = createAsyncThunk(TYPES.FETCH_EVENTS, async (offset: number, thunkAPI) => {
    const response = await EventService.getEventsPageable(offset);
    // handle userIds
    const userIds = EventUtils.extractEventsUserIds(response.data.data);
    thunkAPI.dispatch(InfoThunks.handleUserIds(userIds));
    // handle groupIds
    const groupIds = EventUtils.extractEventsGroupIds(response.data.data);
    thunkAPI.dispatch(InfoThunks.handleGroupIds(groupIds));
    // handle itemIds
    const itemIds = EventUtils.extractEventsItemIds(response.data.data);
    thunkAPI.dispatch(InfoThunks.handleItemIds(itemIds));
    // handle chatIds
    const chatIds = EventUtils.extractEventsChatIds(response.data.data);
    thunkAPI.dispatch(InfoThunks.handleChatIds(chatIds));
    // handle messageIds
    const messageIds = EventUtils.extractEventsMessageIds(response.data.data);
    thunkAPI.dispatch(InfoThunks.handleMessageIds(messageIds));
    // handle commentIds
    const commentIds = EventUtils.extractEventsCommentIds(response.data.data);
    thunkAPI.dispatch(InfoThunks.handleCommentIds(commentIds));
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