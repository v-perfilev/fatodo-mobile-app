import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getEventsState = (state: RootState) => state.events;

class EventsSelectors {
  static events = createSelector(getEventsState, (state) => state.events);

  static unreadCount = createSelector(getEventsState, (state) => state.unreadCount);

  static loading = createSelector(getEventsState, (state) => state.loading);

  static allLoaded = createSelector(getEventsState, (state) => state.allLoaded);
}

export default EventsSelectors;
