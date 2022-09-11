import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EventsState} from './eventsType';
import {EventsActions} from './eventsActions';
import {EventUtils} from '../../shared/utils/EventUtils';
import {Event} from '../../models/Event';

const initialState: EventsState = {
  events: [],
  count: 0,
  unreadCount: 0,
  loading: false,
  allLoaded: false,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    reset: () => initialState,

    addEvent: (state: EventsState, action: PayloadAction<Event>) => {
      const event = action.payload;
      state.events = EventUtils.filterEvents([...state.events, event]);
      state.count = state.count + 1;
      state.unreadCount = state.unreadCount + 1;
    },

    removeChatEvents: (state: EventsState, action: PayloadAction<string>) => {
      const chatId = action.payload;
      state.events = state.events.filter((event) => event.chatEvent?.chatId === chatId);
    },

    removeChatReactionEvents: (state: EventsState, action: PayloadAction<[string, string]>) => {
      const [messageId, userId] = action.payload;
      state.events = state.events.filter(
        (event) =>
          event.chatEvent?.messageId === messageId && event.chatEvent?.userId === userId && event.chatEvent?.reaction,
      );
    },

    removeCommentReactionEvents: (state: EventsState, action: PayloadAction<[string, string]>) => {
      const [commentId, userId] = action.payload;
      state.events = state.events.filter(
        (event) =>
          event.commentEvent?.commentId === commentId &&
          event.commentEvent?.userId === userId &&
          event.commentEvent?.reaction,
      );
    },

    removeItemEvents: (state: EventsState, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.events = state.events.filter((event) => event.itemEvent?.itemId === itemId);
    },

    removeGroupEvents: (state: EventsState, action: PayloadAction<string>) => {
      const groupId = action.payload;
      state.events = state.events.filter((event) => event.itemEvent?.groupId === groupId);
    },

    removeCommentEvents: (state: EventsState, action: PayloadAction<string>) => {
      const targetId = action.payload;
      state.events = state.events.filter((event) => event.commentEvent?.targetId === targetId);
    },

    removeContactEvents: (state: EventsState, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.events = state.events.filter(
        (event) => event.contactEvent?.firstUserId === userId || event.contactEvent?.secondUserId === userId,
      );
    },

    removeReminderEventsByItemId: (state: EventsState, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.events = state.events.filter((event) => event.reminderEvent?.itemId === itemId);
    },

    removeReminderEventsByGroupId: (state: EventsState, action: PayloadAction<string>) => {
      const groupId = action.payload;
      state.events = state.events.filter((event) => event.reminderEvent?.groupId === groupId);
    },
  },
  extraReducers: (builder) => {
    /*
    fetchEvents
    */
    builder.addCase(EventsActions.fetchEventsThunk.pending, (state: EventsState) => {
      state.loading = true;
    });
    builder.addCase(EventsActions.fetchEventsThunk.fulfilled, (state: EventsState, action) => {
      const newEvents = action.payload.data;
      state.events = EventUtils.filterEvents([...state.events, ...newEvents]);
      state.count = action.payload.count;
      state.unreadCount = action.payload.unread;
      state.allLoaded = state.events.length === state.count;
      state.loading = false;
    });
    builder.addCase(EventsActions.fetchEventsThunk.rejected, (state: EventsState) => {
      state.loading = false;
    });

    /*
    refreshEvents
    */
    builder.addCase(EventsActions.refreshEventsThunk.pending, (state: EventsState) => {
      state.loading = true;
    });
    builder.addCase(EventsActions.refreshEventsThunk.fulfilled, (state: EventsState, action) => {
      state.events = action.payload.data;
      state.count = action.payload.count;
      state.unreadCount = action.payload.unread;
      state.allLoaded = state.events.length === state.count;
      state.loading = false;
    });
    builder.addCase(EventsActions.refreshEventsThunk.rejected, (state: EventsState) => {
      state.loading = false;
    });

    /*
    fetchUnreadCount
     */
    builder.addCase(EventsActions.fetchUnreadCountThunk.fulfilled, (state: EventsState, action) => {
      state.unreadCount = action.payload;
    });

    /*
    refreshUnreadCount
     */
    builder.addCase(EventsActions.refreshUnreadCountThunk.fulfilled, (state: EventsState) => {
      state.unreadCount = 0;
    });
  },
});

export default eventsSlice;
