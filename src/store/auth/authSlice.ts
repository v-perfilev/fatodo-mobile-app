import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from './authType';
import {UserAccount} from '../../models/User';

const initialState: AuthState = {
  isAuthenticated: false,
  account: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticated: (state: AuthState) => ({
      ...state,
      isAuthenticated: true,
    }),
    account: (state: AuthState, actions: PayloadAction<UserAccount>) => ({
      ...state,
      account: actions.payload,
    }),
    clearAuth: () => ({
      ...initialState,
    }),
  },
});

export default authSlice;
