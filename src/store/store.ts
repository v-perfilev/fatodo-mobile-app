import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import snackSlice from './snack/snackSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    snack: snackSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
