import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {IS_DEVELOPMENT} from '../constants';
import authSlice from './auth/authSlice';
import snackSlice from './snack/snackSlice';
import contactsSlice from './contacts/contactsSlice';
import infoSlice from './info/infoSlice';
import groupsSlice from './groups/groupsSlice';
import groupSlice from './group/groupSlice';
import itemSlice from './item/itemSlice';
import chatsSlice from './chats/chatsSlice';
import chatSlice from './chat/chatSlice';
import commentsSlice from './comments/commentsSlice';
import userSlice from './user/userSlice';
import eventsSlice from './events/eventsSlice';
import calendarSlice from './calendar/calendarSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    snack: snackSlice.reducer,
    contacts: contactsSlice.reducer,
    info: infoSlice.reducer,
    groups: groupsSlice.reducer,
    group: groupSlice.reducer,
    item: itemSlice.reducer,
    chats: chatsSlice.reducer,
    chat: chatSlice.reducer,
    comments: commentsSlice.reducer,
    user: userSlice.reducer,
    events: eventsSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  devTools: IS_DEVELOPMENT,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
