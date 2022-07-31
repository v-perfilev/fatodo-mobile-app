import {createAsyncThunk} from '@reduxjs/toolkit';
import EventService from '../../services/EventService';
import {EventUtils} from '../../shared/utils/EventUtils';
import {InfoThunks} from '../info/infoActions';
import {Event} from '../../models/Event';
import {AppDispatch} from '../store';
import eventsSlice from './eventsSlice';

export class EventsActions {
  static addEvent = (event: Event) => async (dispatch: AppDispatch) => {
    dispatch(EventsThunks.loadDependencies([event]));
    dispatch(eventsSlice.actions.addEvent(event));
  };
}

enum TYPES {
  FETCH_EVENTS = 'events/fetchEvents',
  LOAD_DEPENDENCIES = 'events/loadDependencies',
  FETCH_UNREAD_COUNT = 'events/getUnreadCount',
  REFRESH_UNREAD_COUNT = 'events/refreshUnreadCount',
}

export class EventsThunks {
  static fetchEvents = createAsyncThunk(TYPES.FETCH_EVENTS, async (offset: number, thunkAPI) => {
    const response = await EventService.getEventsPageable(offset);
    thunkAPI.dispatch(EventsThunks.loadDependencies(response.data.data));
    return response.data;
  });

  static loadDependencies = createAsyncThunk(TYPES.LOAD_DEPENDENCIES, async (events: Event[], thunkAPI) => {
    // handle userIds
    const userIds = EventUtils.extractEventsUserIds(events);
    thunkAPI.dispatch(InfoThunks.handleUserIds(userIds));
    // handle groupIds
    const groupIds = EventUtils.extractEventsGroupIds(events);
    thunkAPI.dispatch(InfoThunks.handleGroupIds(groupIds));
    // handle itemIds
    const itemIds = EventUtils.extractEventsItemIds(events);
    thunkAPI.dispatch(InfoThunks.handleItemIds(itemIds));
    // handle chatIds
    const chatIds = EventUtils.extractEventsChatIds(events);
    thunkAPI.dispatch(InfoThunks.handleChatIds(chatIds));
    // handle messageIds
    const messageIds = EventUtils.extractEventsMessageIds(events);
    thunkAPI.dispatch(InfoThunks.handleMessageIds(messageIds));
    // handle commentIds
    const commentIds = EventUtils.extractEventsCommentIds(events);
    thunkAPI.dispatch(InfoThunks.handleCommentIds(commentIds));
  });

  static fetchUnreadCount = createAsyncThunk(TYPES.FETCH_UNREAD_COUNT, async () => {
    const response = await EventService.getUnreadCount();
    return response.data;
  });

  static refreshUnreadCount = createAsyncThunk(TYPES.REFRESH_UNREAD_COUNT, async () => {
    await EventService.refresh();
  });
}
