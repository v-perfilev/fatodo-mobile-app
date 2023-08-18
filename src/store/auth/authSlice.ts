import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState, NavigatorState, ServerState} from './authType';
import {AuthActions} from './authActions';
import {UserAccount} from '../../models/User';

const initialState: AuthState = {
  isActive: true,
  serverState: 'HEALTHY',
  navigatorState: 'PUBLIC',
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

    setServerState: (state: AuthState, action: PayloadAction<ServerState>) => {
      state.serverState = action.payload;
    },

    setNavigatorState: (state: AuthState, action: PayloadAction<NavigatorState>) => {
      state.navigatorState = action.payload;
    },

    setAccount: (state: AuthState, action: PayloadAction<UserAccount>) => {
      state.account = action.payload;
    },

    setLoading: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    checkHealthy
    */
    builder.addCase(AuthActions.checkHealthThunk.pending, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.checkHealthThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: false});
      authSlice.caseReducers.setServerState(state, {...action, payload: 'HEALTHY'});
      authSlice.caseReducers.setNavigatorState(state, {...action, payload: 'PENDING'});
    });
    builder.addCase(AuthActions.checkHealthThunk.rejected, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: false});
      authSlice.caseReducers.setServerState(state, {...action, payload: 'UNHEALTHY'});
      authSlice.caseReducers.setNavigatorState(state, {...action, payload: 'UNHEALTHY'});
    });

    /*
    login
     */
    builder.addCase(AuthActions.loginThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.setNavigatorState(state, {...action, payload: 'PROTECTED'});
    });
    builder.addCase(AuthActions.loginThunk.rejected, (state, action) => {
      authSlice.caseReducers.setNavigatorState(state, {...action, payload: 'PUBLIC'});
    });

    /*
    register
    */
    builder.addCase(AuthActions.registerThunk.pending, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.registerThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: false});
    });
    builder.addCase(AuthActions.registerThunk.rejected, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: false});
    });

    /*
    socialLogin
     */
    builder.addCase(AuthActions.socialLoginThunk.pending, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.socialLoginThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: false});
      authSlice.caseReducers.setNavigatorState(state, {...action, payload: 'PROTECTED'});
    });
    builder.addCase(AuthActions.socialLoginThunk.rejected, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: false});
    });

    /*
    authenticate
     */
    builder.addCase(AuthActions.authenticateThunk.pending, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.authenticateThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: false});
      authSlice.caseReducers.setNavigatorState(state, {...action, payload: 'PROTECTED'});
    });
    builder.addCase(AuthActions.authenticateThunk.rejected, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: false});
    });

    /*
    forgotPassword
    */
    builder.addCase(AuthActions.forgotPasswordThunk.pending, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.forgotPasswordThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: false});
    });
    builder.addCase(AuthActions.forgotPasswordThunk.rejected, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: false});
    });

    /*
    fetchAccount
     */
    builder.addCase(AuthActions.fetchAccountThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.setAccount(state, action);
    });
    builder.addCase(AuthActions.fetchAccountThunk.rejected, (state) => {
      authSlice.caseReducers.reset(state);
    });
  },
});

export default authSlice;
