import {Dispatch} from 'redux';
import UserService from '../../services/UserService';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';
import {SecurityUtils} from '../../shared/utils/SecurityUtils';

export const ACTION_TYPES = {
  LOGIN: 'authState/LOGIN',
  LOGOUT: 'authState/LOGOUT',
  ACCOUNT: 'authState/ACCOUNT',
  CLEAR_AUTH: 'authState/CLEAR_AUTH',
};

export const clearAuth =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    await SecurityUtils.clearAuthToken();
    dispatch({type: ACTION_TYPES.CLEAR_AUTH});
  };

export const login =
  (username: string, token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    await SecurityUtils.saveAuthToken(username, token);
    dispatch({type: ACTION_TYPES.LOGIN});
  };

export const requestAccountData =
  (onSuccess?: () => void, onFailure?: () => void) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const accountResponse = await UserService.getCurrent();
      LanguageUtils.setLanguageFromUser(accountResponse.data);
      dispatch({type: ACTION_TYPES.ACCOUNT, account: accountResponse.data});
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      clearAuth();
      if (onFailure) {
        onFailure();
      }
    }
  };

export const logout =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    await SecurityUtils.clearAuthToken();
    dispatch({type: ACTION_TYPES.LOGOUT});
  };
