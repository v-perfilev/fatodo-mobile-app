import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from './authType';
import {AuthActions} from './authActions';
import {UserAccount} from '../../models/User';

const initialState: AuthState = {
  isActive: true,
  isSleepMode: false,
  isAuthenticated: false,
  account: undefined,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state: AuthState) => {
      Object.assign(state, initialState);
    },

    setIsActive: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },

    setIsSleepMode: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isSleepMode = action.payload;
    },

    authenticated: (state: AuthState) => {
      state.isAuthenticated = true;
    },

    account: (state: AuthState, action: PayloadAction<UserAccount>) => {
      state.account = action.payload;
    },

    loading: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    register
    */
    builder.addCase(AuthActions.registerThunk.pending, (state: AuthState) => {
      Object.assign(state, initialState);
      state.loading = true;
    });
    builder.addCase(AuthActions.registerThunk.fulfilled, (state: AuthState) => {
      Object.assign(state, initialState);
    });
    builder.addCase(AuthActions.registerThunk.rejected, (state: AuthState) => {
      Object.assign(state, initialState);
    });

    /*
    authenticate
     */
    builder.addCase(AuthActions.authenticateThunk.pending, (state: AuthState) => {
      Object.assign(state, initialState);
      state.loading = true;
    });
    builder.addCase(AuthActions.authenticateThunk.fulfilled, (state: AuthState) => {
      state.isAuthenticated = true;
    });
    builder.addCase(AuthActions.authenticateThunk.rejected, (state: AuthState) => {
      Object.assign(state, initialState);
    });

    /*
    fetchAccount
     */
    builder.addCase(AuthActions.fetchAccountThunk.pending, (state: AuthState) => {
      state.loading = true;
    });
    builder.addCase(AuthActions.fetchAccountThunk.fulfilled, (state: AuthState, action) => {
      state.account = action.payload;
      state.loading = false;
    });
    builder.addCase(AuthActions.fetchAccountThunk.rejected, (state: AuthState) => {
      Object.assign(state, initialState);
    });

    /*
    forgotPassword
    */
    builder.addCase(AuthActions.forgotPasswordThunk.pending, (state: AuthState) => {
      Object.assign(state, initialState);
      state.loading = true;
    });
    builder.addCase(AuthActions.forgotPasswordThunk.fulfilled, (state: AuthState) => {
      Object.assign(state, initialState);
    });
    builder.addCase(AuthActions.forgotPasswordThunk.rejected, (state: AuthState) => {
      Object.assign(state, initialState);
    });
  },
});

export default authSlice;
