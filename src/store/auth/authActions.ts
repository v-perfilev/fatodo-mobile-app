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
import {accountToUser, UserAccount, UserSettings} from '../../models/User';
import {InfoActions} from '../info/infoActions';

const PREFIX = 'auth/';

export class AuthActions {
  static setIsActive = (isActive: boolean) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setIsActive(isActive));
  };

  static setIsAuthenticated = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setIsAuthenticated(true));
  };

  static setLoading = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setLoading(value));
  };

  static logout = () => (dispatch: AppDispatch) => {
    SecurityUtils.clearAuthToken();
    NotificationsRemote.unregisterDeviceFromFirebase();
    dispatch(authSlice.actions.reset());
  };

  static registerThunk = createAsyncThunk<void, RegistrationDTO, AsyncThunkConfig>(
    PREFIX + 'register',
    async (dto, thunkAPI) => {
      await AuthService.register(dto);
      thunkAPI.dispatch(SnackActions.handleCode('auth.registered', 'info'));
    },
  );

  static authenticateThunk = createAsyncThunk<void, LoginDTO, AsyncThunkConfig>(
    PREFIX + 'authenticate',
    async (dto, thunkAPI) => {
      const response = await AuthService.authenticate(dto);
      const token = SecurityUtils.parseTokenFromResponse(response);
      await SecurityUtils.saveAuthToken(dto.user, token);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
    },
  );

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

  static deleteAccountPermanentlyThunk = createAsyncThunk<void, string, AsyncThunkConfig>(
    PREFIX + 'deleteAccount',
    async (userId, thunkAPI) => {
      await UserService.deleteAccountPermanently(userId);
      await thunkAPI.dispatch(AuthActions.logout());
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterDeleteAccount', 'info'));
    },
  );
}
