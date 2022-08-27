import {createAsyncThunk} from '@reduxjs/toolkit';
import EventService from '../../services/EventService';
import {EventUtils} from '../../shared/utils/EventUtils';
import {InfoActions} from '../info/infoActions';
import {Event} from '../../models/Event';
import {AppDispatch} from '../store';
import eventsSlice from './eventsSlice';

const PREFIX = 'events/';

export class EventsThunks {
  static addEvent = (event: Event) => async (dispatch: AppDispatch) => {
    dispatch(EventsThunks.loadDependenciesThunk([event]));
    dispatch(eventsSlice.actions.addEvent(event));
  };

  static fetchEventsThunk = createAsyncThunk(PREFIX + 'fetchEvents', async (offset: number, thunkAPI) => {
    const response = await EventService.getEventsPageable(offset);
    thunkAPI.dispatch(EventsThunks.loadDependenciesThunk(response.data.data));
    return response.data;
  });

  static loadDependenciesThunk = createAsyncThunk(PREFIX + 'loadDependencies', async (events: Event[], thunkAPI) => {
    // handle userIds
    const userIds = EventUtils.extractEventsUserIds(events);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(userIds));
    // handle groupIds
    const groupIds = EventUtils.extractEventsGroupIds(events);
    thunkAPI.dispatch(InfoActions.handleGroupIdsThunk(groupIds));
    // handle itemIds
    const itemIds = EventUtils.extractEventsItemIds(events);
    thunkAPI.dispatch(InfoActions.handleItemIdsThunk(itemIds));
    // handle chatIds
    const chatIds = EventUtils.extractEventsChatIds(events);
    thunkAPI.dispatch(InfoActions.handleChatIdsThunk(chatIds));
    // handle messageIds
    const messageIds = EventUtils.extractEventsMessageIds(events);
    thunkAPI.dispatch(InfoActions.handleMessageIdsThunk(messageIds));
    // handle commentIds
    const commentIds = EventUtils.extractEventsCommentIds(events);
    thunkAPI.dispatch(InfoActions.handleCommentIdsThunk(commentIds));
  });

  static fetchUnreadCountThunk = createAsyncThunk(PREFIX + 'fetchUnreadCount', async () => {
    const response = await EventService.getUnreadCount();
    return response.data;
  });

  static refreshUnreadCountThunk = createAsyncThunk(PREFIX + 'refreshUnreadCount', async () => {
    await EventService.refresh();
  });
}
