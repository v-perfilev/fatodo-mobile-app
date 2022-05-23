import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import authSlice from './auth/authSlice';
import snackSlice from './snack/snackSlice';
import contactsSlice from './contacts/contactsSlice';
import usersSlice from './users/usersSlice';
import groupsSlice from './groups/groupsSlice';
import groupSlice from './group/groupSlice';
import itemSlice from './item/itemSlice';
import chatsSlice from './chats/chatsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    snack: snackSlice.reducer,
    contacts: contactsSlice.reducer,
    users: usersSlice.reducer,
    groups: groupsSlice.reducer,
    group: groupSlice.reducer,
    item: itemSlice.reducer,
    chats: chatsSlice.reducer,
    chat: chatsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
