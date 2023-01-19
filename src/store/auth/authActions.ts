import {SecurityUtils} from '../../shared/utils/SecurityUtils';
import authSlice from './authSlice';
import {AppDispatch, AsyncThunkConfig} from '../store';
import {RegistrationDTO} from '../../models/dto/RegistrationDTO';
import AuthService from '../../services/AuthService';
import {LoginDTO} from '../../models/dto/LoginDTO';
import UserService from '../../services/UserService';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';
import {ForgotPasswordDTO} from '../../models/dto/ForgotPasswordDTO';
import {ChangePasswordDTO} from '../../models/dto/ChangePasswordDTO';
import NotificationsRemote from '../../shared/push/notificationsRemote';
import {ChangeLanguageDTO} from '../../models/dto/ChangeLanguageDTO';
import {SnackActions} from '../snack/snackActions';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {accountToUser, UserAccount, UserNotifications, UserSettings} from '../../models/User';
import {InfoActions} from '../info/infoActions';
import {RootActions} from '../rootActions';

const PREFIX = 'auth/';

export class AuthActions {
  static afterLogout = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.reset());
  };

  static setIsActive = (isActive: boolean) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setIsActive(isActive));
  };

  static setIsAuthenticated = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setIsAuthenticated(true));
  };

  static setLoading = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setLoading(value));
  };

  static registerThunk = createAsyncThunk<void, RegistrationDTO, AsyncThunkConfig>(
    PREFIX + 'register',
    async (dto, thunkAPI) => {
      await AuthService.register(dto);
      thunkAPI.dispatch(SnackActions.handleCode('auth.registered', 'info'));
    },
  );

  static socialLoginThunk = createAsyncThunk<void, string, AsyncThunkConfig>(
    PREFIX + 'socialLogin',
    async (token, thunkAPI) => {
      SecurityUtils.clearAuthToken();
      await SecurityUtils.saveAuthToken('oauth2', token);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
    },
  );

  static authenticateThunk = createAsyncThunk<void, LoginDTO, AsyncThunkConfig>(
    PREFIX + 'authenticate',
    async (dto, thunkAPI) => {
      SecurityUtils.clearAuthToken();
      const response = await AuthService.authenticate(dto);
      const token = SecurityUtils.parseTokenFromResponse(response);
      await SecurityUtils.saveAuthToken(dto.user, token);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
    },
  );

  static logoutThunk = createAsyncThunk<void, void, AsyncThunkConfig>(PREFIX + 'logout', async (_, thunkAPI) => {
    const account = thunkAPI.getState().auth.account;
    NotificationsRemote.unsubscribeFromFirebase(account?.id).finally();
    SecurityUtils.clearAuthToken();
    thunkAPI.dispatch(RootActions.afterLogoutState());
  });

  static fetchAccountThunk = createAsyncThunk<UserAccount, void, AsyncThunkConfig>(
    PREFIX + 'fetchAccount',
    async (_, thunkAPI) => {
      const response = await UserService.getCurrent();
      const account = response.data;
      LanguageUtils.setLanguageFromUser(account);
      thunkAPI.dispatch(InfoActions.handleUsers([accountToUser(account)]));
      return account;
    },
  );

  static activateThunk = createAsyncThunk<void, string, AsyncThunkConfig>(
    PREFIX + 'activate',
    async (code, thunkAPI) => {
      await AuthService.activate(code);
      thunkAPI.dispatch(SnackActions.handleCode('auth.activated', 'info'));
    },
  );

  static forgotPasswordThunk = createAsyncThunk<void, ForgotPasswordDTO, AsyncThunkConfig>(
    PREFIX + 'forgotPassword',
    async (dto, thunkAPI) => {
      await AuthService.requestResetPasswordCode(dto);
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterForgotPassword', 'info'));
    },
  );

  static changePasswordThunk = createAsyncThunk<void, ChangePasswordDTO, AsyncThunkConfig>(
    PREFIX + 'changePassword',
    async (dto, thunkAPI) => {
      await UserService.changePassword(dto);
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterChangePassword', 'info'));
    },
  );

  static changeLanguageThunk = createAsyncThunk<void, ChangeLanguageDTO, AsyncThunkConfig>(
    PREFIX + 'changeLanguage',
    async (dto, thunkAPI) => {
      await UserService.changeLanguage(dto);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
    },
  );

  static updateAccountInfoThunk = createAsyncThunk<void, FormData, AsyncThunkConfig>(
    PREFIX + 'updateAccountInfo',
    async (formData, thunkAPI) => {
      await UserService.updateAccountInfo(formData);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterUpdateAccount', 'info'));
    },
  );

  static updateAccountSettingsThunk = createAsyncThunk<void, UserSettings, AsyncThunkConfig>(
    PREFIX + 'updateAccountSettings',
    async (settings, thunkAPI) => {
      await UserService.updateAccountSettings(settings);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterUpdateAccount', 'info'));
    },
  );

  static updateAccountNotificationsThunk = createAsyncThunk<void, UserNotifications, AsyncThunkConfig>(
    PREFIX + 'updateAccountNotifications',
    async (settings, thunkAPI) => {
      await UserService.updateAccountNotifications(settings);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterUpdateAccount', 'info'));
    },
  );

  static deleteAccountPermanentlyThunk = createAsyncThunk<void, string, AsyncThunkConfig>(
    PREFIX + 'deleteAccount',
    async (userId, thunkAPI) => {
      await UserService.deleteAccountPermanently(userId);
      await thunkAPI.dispatch(AuthActions.logoutThunk());
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterDeleteAccount', 'info'));
    },
  );
}
