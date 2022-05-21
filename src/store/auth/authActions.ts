import {SecurityUtils} from '../../shared/utils/SecurityUtils';
import authSlice from './authSlice';
import {AppDispatch} from '../store';

export class AuthActions {
  static login = () => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.authenticated());
  };

  static loading = (value: boolean) => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.loading(value));
  };

  static logout = () => async (dispatch: AppDispatch) => {
    await SecurityUtils.clearAuthToken();
    dispatch(authSlice.actions.clearAuth());
  };
}

export default AuthActions;
