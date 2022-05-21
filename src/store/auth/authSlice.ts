import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from './authType';
import {UserAccount} from '../../models/User';
import AuthThunks from './authThunks';

const initialState: AuthState = {
  isAuthenticated: false,
  account: undefined,
  loading: false,
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
    loading: (state: AuthState, actions: PayloadAction<boolean>) => ({
      ...state,
      loading: actions.payload,
    }),
    clearAuth: () => ({
      ...initialState,
    }),
  },
  extraReducers: (builder) => {
    /*
    register
    */
    builder.addCase(AuthThunks.register.pending, () => ({
      ...initialState,
      loading: true,
    }));
    builder.addCase(AuthThunks.register.fulfilled, () => ({
      ...initialState,
    }));
    builder.addCase(AuthThunks.register.rejected, () => ({
      ...initialState,
    }));

    /*
    authenticate
     */
    builder.addCase(AuthThunks.authenticate.pending, () => ({
      ...initialState,
      loading: true,
    }));
    builder.addCase(AuthThunks.authenticate.fulfilled, (state) => ({
      ...state,
      isAuthenticated: true,
    }));
    builder.addCase(AuthThunks.authenticate.rejected, () => ({
      ...initialState,
    }));

    /*
    fetchAccount
     */
    builder.addCase(AuthThunks.fetchAccount.pending, (state) => ({
      ...state,
      account: undefined,
      loading: true,
    }));
    builder.addCase(AuthThunks.fetchAccount.fulfilled, (state, action) => ({
      ...state,
      account: action.payload,
      loading: false,
    }));
    builder.addCase(AuthThunks.fetchAccount.rejected, () => ({
      ...initialState,
    }));

    /*
    forgotPassword
    */
    builder.addCase(AuthThunks.forgotPassword.pending, () => ({
      ...initialState,
      loading: true,
    }));
    builder.addCase(AuthThunks.forgotPassword.fulfilled, () => ({
      ...initialState,
    }));
    builder.addCase(AuthThunks.forgotPassword.rejected, () => ({
      ...initialState,
    }));
  },
});

export default authSlice;
