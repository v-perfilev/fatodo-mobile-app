import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NotificationState} from './notificationType';
import {Event} from '../../models/Event';

const initialState: NotificationState = {
  events: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    add: (state: NotificationState, action: PayloadAction<Event>) => {
      state.events = [...state.events, action.payload];
    },

    remove: (state: NotificationState) => {
      state.events = state.events.slice(1);
    },
  },
});

export default notificationSlice;
