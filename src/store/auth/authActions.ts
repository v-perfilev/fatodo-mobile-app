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
import {NotificationsLocal} from '../../shared/push/notifications';

export class AuthActions {
  static login = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.authenticated());
  };

  static loading = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.loading(value));
  };

  static logout = () => (dispatch: AppDispatch) => {
    SecurityUtils.clearAuthToken();
    NotificationsLocal.unregisterDeviceFromFirebase();
    dispatch(authSlice.actions.clearAuth());
  };
}

enum TYPES {
  REGISTER = 'account/register',
  AUTHENTICATE = 'account/authenticate',
  FETCH_ACCOUNT = 'account/fetchAccount',
  FORGOT_PASSWORD = 'account/forgotPassword',
  CHANGE_PASSWORD = 'account/changePassword',
  UPDATE_ACCOUNT = 'account/updateAccount',
}

export class AuthThunks {
  static register = createAsyncThunk(TYPES.REGISTER, async (dto: RegistrationDTO, thunkAPI) => {
    await AuthService.register(dto);
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'auth.registered', variant: 'info'}));
  });

  static authenticate = createAsyncThunk(TYPES.AUTHENTICATE, async (dto: LoginDTO, thunkAPI) => {
    const response = await AuthService.authenticate(dto);
    const token = SecurityUtils.parseTokenFromResponse(response);
    await SecurityUtils.saveAuthToken(dto.user, token);
    await thunkAPI.dispatch(AuthThunks.fetchAccount());
  });

  static fetchAccount = createAsyncThunk(TYPES.FETCH_ACCOUNT, async () => {
    const response = await UserService.getCurrent();
    const account = response.data;
    LanguageUtils.setLanguageFromUser(account);
    return account;
  });

  static forgotPassword = createAsyncThunk(TYPES.FORGOT_PASSWORD, async (dto: ForgotPasswordDTO, thunkAPI) => {
    await AuthService.requestResetPasswordCode(dto);
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'auth.afterForgotPassword', variant: 'info'}));
  });

  static changePassword = createAsyncThunk(TYPES.CHANGE_PASSWORD, async (dto: ChangePasswordDTO, thunkAPI) => {
    await UserService.changePassword(dto);
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'auth.afterChangePassword', variant: 'info'}));
  });

  static updateAccount = createAsyncThunk(TYPES.UPDATE_ACCOUNT, async (formData: FormData, thunkAPI) => {
    await UserService.updateAccount(formData);
    await thunkAPI.dispatch(AuthThunks.fetchAccount());
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'auth.afterUpdateAccount', variant: 'info'}));
  });
}
