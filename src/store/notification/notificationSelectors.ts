import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Event} from '../../models/Event';

const getNotificationState = (state: RootState) => state.notifications;

class NotificationSelectors {
  static events = createSelector(getNotificationState, (state) => state.events as Event[]);
}

export default NotificationSelectors;
