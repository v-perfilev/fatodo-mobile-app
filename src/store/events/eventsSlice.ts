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
      state.events = EventUtils.filterEvents([...state.events, event]);
      state.count = state.count + 1;
      state.unreadCount = state.unreadCount + 1;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchEvents
    */
    builder.addCase(EventsThunks.fetchEvents.pending, (state: EventsState) => {
      state.loading = true;
    });
    builder.addCase(EventsThunks.fetchEvents.fulfilled, (state: EventsState, action) => {
      const newEvents = action.payload.data;
      state.events = EventUtils.filterEvents([...state.events, ...newEvents]);
      state.count = action.payload.count;
      state.unreadCount = action.payload.unread;
      state.allLoaded = state.events.length === state.count;
      state.loading = false;
    });
    builder.addCase(EventsThunks.fetchEvents.rejected, (state: EventsState) => {
      state.loading = false;
    });

    /*
    fetchUnreadCount
     */
    builder.addCase(EventsThunks.fetchUnreadCount.fulfilled, (state: EventsState, action) => {
      state.unreadCount = action.payload;
    });

    /*
    refreshUnreadCount
     */
    builder.addCase(EventsThunks.refreshUnreadCount.fulfilled, (state: EventsState) => {
      state.unreadCount = 0;
    });
  },
});

export default eventsSlice;
