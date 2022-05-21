import {SecurityUtils} from '../../shared/utils/SecurityUtils';
import {Dispatch} from 'redux';
import UserService from '../../services/UserService';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';
import authSlice from './authSlice';

export class AuthActions {
  static login = (username?: string, token?: string) => async (dispatch: Dispatch) => {
    if (username && token) {
      await SecurityUtils.saveAuthToken(token, token);
    }
    dispatch(authSlice.actions.authenticated());
  };

  static requestAccountData = (onSuccess?: () => void, onFailure?: () => void) => async (dispatch: Dispatch) => {
    try {
      const accountResponse = await UserService.getCurrent();
      LanguageUtils.setLanguageFromUser(accountResponse.data);
      dispatch(authSlice.actions.account(accountResponse.data));
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      dispatch(authSlice.actions.clearAuth());
      if (onFailure) {
        onFailure();
      }
    }
  };

  static logout = () => async (dispatch: Dispatch) => {
    await SecurityUtils.clearAuthToken();
    dispatch(authSlice.actions.clearAuth());
  };
}

export default AuthActions;
