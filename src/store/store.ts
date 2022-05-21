import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import authSlice from './auth/authSlice';
import snackSlice from './snack/snackSlice';
import contactsSlice from './contacts/contactsSlice';
import usersSlice from './users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    snack: snackSlice.reducer,
    contacts: contactsSlice.reducer,
    users: usersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
