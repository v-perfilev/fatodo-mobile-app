import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import snackSlice from './snack/snackSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import contactSlice from './contact/contactSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    snack: snackSlice.reducer,
    contact: contactSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
