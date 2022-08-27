import {SecurityUtils} from '../../shared/utils/SecurityUtils';
import authSlice from './authSlice';
import {AppDispatch} from '../store';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RegistrationDTO} from '../../models/dto/RegistrationDTO';
import AuthService from '../../services/AuthService';
import {LoginDTO} from '../../models/dto/LoginDTO';
import UserService from '../../services/UserService';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';
import {ForgotPasswordDTO} from '../../models/dto/ForgotPasswordDTO';
import snackSlice from '../snack/snackSlice';
import {ChangePasswordDTO} from '../../models/dto/ChangePasswordDTO';
import NotificationsRemote from '../../shared/push/notificationsRemote';

const PREFIX = 'auth/';

export class AuthActions {
  static login = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.authenticated());
  };

  static loading = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.loading(value));
  };

  static logout = () => (dispatch: AppDispatch) => {
    SecurityUtils.clearAuthToken();
    NotificationsRemote.unregisterDeviceFromFirebase();
    dispatch(authSlice.actions.clearAuth());
  };

  static registerThunk = createAsyncThunk(PREFIX + 'register', async (dto: RegistrationDTO, thunkAPI) => {
    await AuthService.register(dto);
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'auth.registered', variant: 'info'}));
  });

  static authenticateThunk = createAsyncThunk(PREFIX + 'authenticate', async (dto: LoginDTO, thunkAPI) => {
    const response = await AuthService.authenticate(dto);
    const token = SecurityUtils.parseTokenFromResponse(response);
    await SecurityUtils.saveAuthToken(dto.user, token);
    await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
  });

  static fetchAccountThunk = createAsyncThunk(PREFIX + 'fetchAccount', async () => {
    const response = await UserService.getCurrent();
    const account = response.data;
    LanguageUtils.setLanguageFromUser(account);
    return account;
  });

  static forgotPasswordThunk = createAsyncThunk(PREFIX + 'forgotPassword', async (dto: ForgotPasswordDTO, thunkAPI) => {
    await AuthService.requestResetPasswordCode(dto);
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'auth.afterForgotPassword', variant: 'info'}));
  });

  static changePasswordThunk = createAsyncThunk(PREFIX + 'changePassword', async (dto: ChangePasswordDTO, thunkAPI) => {
    await UserService.changePassword(dto);
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'auth.afterChangePassword', variant: 'info'}));
  });

  static updateAccountThunk = createAsyncThunk(PREFIX + 'updateAccount', async (formData: FormData, thunkAPI) => {
    await UserService.updateAccount(formData);
    await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'auth.afterUpdateAccount', variant: 'info'}));
  });
}
