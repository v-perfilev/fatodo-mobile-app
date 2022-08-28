import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from './authType';
import {AuthActions} from './authActions';
import {UserAccount} from '../../models/User';

const initialState: AuthState = {
  isActive: false,
  isAuthenticated: false,
  account: undefined,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAppStatus: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
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

    clearAuth: () => {
      return {...initialState};
    },
  },
  extraReducers: (builder) => {
    /*
    register
    */
    builder.addCase(AuthActions.registerThunk.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(AuthActions.registerThunk.fulfilled, () => {
      return {...initialState};
    });
    builder.addCase(AuthActions.registerThunk.rejected, () => {
      return {...initialState};
    });

    /*
    authenticate
     */
    builder.addCase(AuthActions.authenticateThunk.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(AuthActions.authenticateThunk.fulfilled, (state: AuthState) => {
      state.isAuthenticated = true;
    });
    builder.addCase(AuthActions.authenticateThunk.rejected, () => {
      return {...initialState};
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
    builder.addCase(AuthActions.fetchAccountThunk.rejected, () => {
      return {...initialState};
    });

    /*
    forgotPassword
    */
    builder.addCase(AuthActions.forgotPasswordThunk.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(AuthActions.forgotPasswordThunk.fulfilled, () => {
      return {...initialState};
    });
    builder.addCase(AuthActions.forgotPasswordThunk.rejected, () => {
      return {...initialState};
    });
  },
});

export default authSlice;
