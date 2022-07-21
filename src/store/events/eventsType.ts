import {Event} from '../../models/Event';

export type EventsState = {
  events: Event[];
  count: number;
  unreadCount: number;
  loading: boolean;
  allLoaded: boolean;
};
