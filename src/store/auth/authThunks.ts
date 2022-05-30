import {createAsyncThunk} from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import {LoginDTO} from '../../models/dto/LoginDTO';
import {SecurityUtils} from '../../shared/utils/SecurityUtils';
import UserService from '../../services/UserService';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';
import {RegistrationDTO} from '../../models/dto/RegistrationDTO';
import {ForgotPasswordDTO} from '../../models/dto/ForgotPasswordDTO';
import SnackActions from '../snack/snackActions';

enum TYPES {
  REGISTER = 'account/register',
  AUTHENTICATE = 'account/authenticate',
  FETCH_ACCOUNT = 'account/fetchAccount',
  FORGOT_PASSWORD = 'account/forgotPassword',
}

class AuthThunks {
  static register = createAsyncThunk(TYPES.REGISTER, async (dto: RegistrationDTO, thunkAPI) => {
    await AuthService.register(dto);
    thunkAPI.dispatch(SnackActions.handleCode('auth.registered', 'info'));
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
    thunkAPI.dispatch(SnackActions.handleCode('auth.afterForgotPassword', 'info'));
  });
}

export default AuthThunks;
