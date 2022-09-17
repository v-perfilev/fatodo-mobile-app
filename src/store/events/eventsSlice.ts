import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EventsState} from './eventsType';
import {EventsActions} from './eventsActions';
import {Event} from '../../models/Event';
import {FilterUtils} from '../../shared/utils/FilterUtils';
import {ComparatorUtils} from '../../shared/utils/ComparatorUtils';

const initialState: EventsState = {
  events: [],
  unreadCount: 0,
  allLoaded: false,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    reset: (state: EventsState) => {
      Object.assign(state, initialState);
    },

    resetEvents: (state: EventsState) => {
      state.events = [];
    },

    setEvents: (state: EventsState, action: PayloadAction<Event[]>) => {
      state.events = filterEvents([...action.payload, ...state.events]);
    },

    setUnreadCount: (state: EventsState, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },

    incrementUnreadCount: (state: EventsState) => {
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

    calculateAllLoaded: (state: EventsState, action: PayloadAction<number>) => {
      state.allLoaded = state.events.length === action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchEvents
    */
    builder.addCase(EventsActions.fetchEventsThunk.fulfilled, (state, action) => {
      eventsSlice.caseReducers.setEvents(state, {...action, payload: action.payload.data});
      eventsSlice.caseReducers.calculateAllLoaded(state, {...action, payload: action.payload.count});
      eventsSlice.caseReducers.setUnreadCount(state, {...action, payload: action.payload.unread});
    });

    /*
    refreshEvents
    */
    builder.addCase(EventsActions.refreshEventsThunk.fulfilled, (state: EventsState, action) => {
      eventsSlice.caseReducers.resetEvents(state);
      eventsSlice.caseReducers.setEvents(state, {...action, payload: action.payload.data});
      eventsSlice.caseReducers.calculateAllLoaded(state, {...action, payload: action.payload.count});
      eventsSlice.caseReducers.setUnreadCount(state, {...action, payload: action.payload.unread});
    });

    /*
    fetchUnreadCount
     */
    builder.addCase(EventsActions.fetchUnreadCountThunk.fulfilled, (state: EventsState, action) => {
      eventsSlice.caseReducers.setUnreadCount(state, action);
    });

    /*
    refreshUnreadCount
     */
    builder.addCase(EventsActions.refreshUnreadCountThunk.fulfilled, (state: EventsState, action) => {
      eventsSlice.caseReducers.setUnreadCount(state, {...action, payload: 0});
    });
  },
});

const filterEvents = (events: Event[]): Event[] => {
  return events.filter(FilterUtils.uniqueByIdOrTypeAndDateFilter).sort(ComparatorUtils.dateComparator).reverse();
};

export default eventsSlice;
