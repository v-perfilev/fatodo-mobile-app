import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';

const getEventsState = (state: RootState) => state.events;

class EventsSelectors {
  static events = createSelector(getEventsState, (state) => state.events);

  static loading = createSelector(getEventsState, (state) => state.loading);
}

export default EventsSelectors;
