import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EventsState} from './eventsType';
import {EventsThunks} from './eventsActions';
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
    addEvent: (state: EventsState, action: PayloadAction<Event>) => {
      const event = action.payload;
      const events = EventUtils.filterEvents([...state.events, event]);
      const count = state.count + 1;
      const unreadCount = state.unreadCount + 1;
      return {...state, events, count, unreadCount};
    },
  },
  extraReducers: (builder) => {
    /*
    fetchEvents
    */
    builder.addCase(EventsThunks.fetchEvents.pending, (state: EventsState) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(EventsThunks.fetchEvents.fulfilled, (state: EventsState, action) => {
      const newEvents = action.payload.data;
      const events = EventUtils.filterEvents([...state.events, ...newEvents]);
      const count = action.payload.count;
      const unreadCount = action.payload.unread;
      const allLoaded = events.length === count;
      return {...state, events, count, unreadCount, allLoaded, loading: false};
    });
    builder.addCase(EventsThunks.fetchEvents.rejected, (state: EventsState) => ({
      ...state,
      loading: false,
    }));

    /*
    fetchUnreadCount
     */
    builder.addCase(EventsThunks.fetchUnreadCount.fulfilled, (state: EventsState, action) => {
      const unreadCount = action.payload;
      return {...state, unreadCount};
    });

    /*
    refreshUnreadCount
     */
    builder.addCase(EventsThunks.refreshUnreadCount.fulfilled, (state: EventsState) => {
      const unreadCount = 0;
      return {...state, unreadCount};
    });
  },
});

export default eventsSlice;
