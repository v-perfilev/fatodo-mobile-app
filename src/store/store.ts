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
import commonSlice from './common/commonSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    calendar: calendarSlice.reducer,
    chat: chatSlice.reducer,
    chats: chatsSlice.reducer,
    comments: commentsSlice.reducer,
    common: commonSlice.reducer,
    contacts: contactsSlice.reducer,
    events: eventsSlice.reducer,
    group: groupSlice.reducer,
    groups: groupsSlice.reducer,
    info: infoSlice.reducer,
    item: itemSlice.reducer,
    snack: snackSlice.reducer,
    user: userSlice.reducer,
  },
  devTools: IS_DEVELOPMENT,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncThunkConfig = {state: RootState; dispatch: AppDispatch};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
