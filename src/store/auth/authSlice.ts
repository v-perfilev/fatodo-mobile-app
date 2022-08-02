import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from './authType';
import {AuthThunks} from './authActions';
import {UserAccount} from '../../models/User';

const initialState: AuthState = {
  isAuthenticated: false,
  account: undefined,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
    builder.addCase(AuthThunks.register.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(AuthThunks.register.fulfilled, () => {
      return {...initialState};
    });
    builder.addCase(AuthThunks.register.rejected, () => {
      return {...initialState};
    });

    /*
    authenticate
     */
    builder.addCase(AuthThunks.authenticate.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(AuthThunks.authenticate.fulfilled, (state: AuthState) => {
      state.isAuthenticated = true;
    });
    builder.addCase(AuthThunks.authenticate.rejected, () => {
      return {...initialState};
    });

    /*
    fetchAccount
     */
    builder.addCase(AuthThunks.fetchAccount.pending, (state: AuthState) => {
      state.loading = true;
    });
    builder.addCase(AuthThunks.fetchAccount.fulfilled, (state: AuthState, action) => {
      state.account = action.payload;
      state.loading = false;
    });
    builder.addCase(AuthThunks.fetchAccount.rejected, () => {
      return {...initialState};
    });

    /*
    forgotPassword
    */
    builder.addCase(AuthThunks.forgotPassword.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(AuthThunks.forgotPassword.fulfilled, () => {
      return {...initialState};
    });
    builder.addCase(AuthThunks.forgotPassword.rejected, () => {
      return {...initialState};
    });
  },
});

export default authSlice;
