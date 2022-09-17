import {RootState} from '../store';
import {createSelector} from '@reduxjs/toolkit';
import {Event} from '../../models/Event';

const getEventsState = (state: RootState) => state.events;

class EventsSelectors {
  static events = createSelector(getEventsState, (state) => state.events as Event[]);

  static unreadCount = createSelector(getEventsState, (state) => state.unreadCount as number);

  static allLoaded = createSelector(getEventsState, (state) => state.allLoaded as boolean);
}

export default EventsSelectors;
