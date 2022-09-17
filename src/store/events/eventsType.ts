import {Event} from '../../models/Event';

export type EventsState = {
  events: Event[];
  unreadCount: number;
  allLoaded: boolean;
};
