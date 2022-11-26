import {createAsyncThunk} from '@reduxjs/toolkit';
import EventService from '../../services/EventService';
import {EventUtils} from '../../shared/utils/EventUtils';
import {InfoActions} from '../info/infoActions';
import {Event} from '../../models/Event';
import {AppDispatch, AsyncThunkConfig} from '../store';
import eventsSlice from './eventsSlice';
import {PageableReadableList} from '../../models/PageableReadableList';

const PREFIX = 'events/';

export class EventsActions {
  static addEvent = (event: Event, isOwnEvent: boolean) => async (dispatch: AppDispatch) => {
    dispatch(EventsActions.loadDependenciesThunk([event]));
    dispatch(eventsSlice.actions.setEvents([event]));
    !isOwnEvent && dispatch(eventsSlice.actions.incrementUnreadCount());
  };

  static removeChatEvents = (chatId: string) => async (dispatch: AppDispatch) => {
    dispatch(eventsSlice.actions.removeChatEvents(chatId));
  };

  static removeChatReactionEvents = (messageId: string, userId: string) => async (dispatch: AppDispatch) => {
    dispatch(eventsSlice.actions.removeChatReactionEvents([messageId, userId]));
  };

  static removeCommentEvent = (commentId: string) => async (dispatch: AppDispatch) => {
    dispatch(eventsSlice.actions.removeCommentEvent(commentId));
  };

  static removeCommentReactionEvents = (commentId: string, userId: string) => async (dispatch: AppDispatch) => {
    dispatch(eventsSlice.actions.removeCommentReactionEvents([commentId, userId]));
  };

  static removeItemEvents = (itemId: string) => async (dispatch: AppDispatch) => {
    dispatch(eventsSlice.actions.removeItemEvents(itemId));
    dispatch(eventsSlice.actions.removeCommentEvents(itemId));
    dispatch(eventsSlice.actions.removeReminderEventsByItemId(itemId));
  };

  static removeGroupEvents = (groupId: string) => async (dispatch: AppDispatch) => {
    dispatch(eventsSlice.actions.removeGroupEvents(groupId));
    dispatch(eventsSlice.actions.removeCommentEvents(groupId));
    dispatch(eventsSlice.actions.removeReminderEventsByGroupId(groupId));
  };

  static removeContactEvents = (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(eventsSlice.actions.removeContactEvents(userId));
  };

  static fetchEventsThunk = createAsyncThunk<PageableReadableList<Event>, number, AsyncThunkConfig>(
    PREFIX + 'fetchEvents',
    async (offset, thunkAPI) => {
      const response = await EventService.getEventsPageable(offset);
      thunkAPI.dispatch(EventsActions.loadDependenciesThunk(response.data.data));
      return response.data;
    },
  );

  static refreshEventsThunk = createAsyncThunk<PageableReadableList<Event>, void, AsyncThunkConfig>(
    PREFIX + 'refreshEvents',
    async (_, thunkAPI) => {
      const response = await EventService.getEventsPageable(0);
      thunkAPI.dispatch(EventsActions.loadDependenciesThunk(response.data.data));
      return response.data;
    },
  );

  static fetchUnreadCountThunk = createAsyncThunk<number, void, AsyncThunkConfig>(
    PREFIX + 'fetchUnreadCount',
    async () => {
      const response = await EventService.getUnreadCount();
      return response.data;
    },
  );

  static refreshUnreadCountThunk = createAsyncThunk<void, void, AsyncThunkConfig>(
    PREFIX + 'refreshUnreadCount',
    async () => {
      await EventService.refresh();
    },
  );

  static loadDependenciesThunk = createAsyncThunk<void, Event[], AsyncThunkConfig>(
    PREFIX + 'loadDependencies',
    async (events, thunkAPI) => {
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
    },
  );
}
