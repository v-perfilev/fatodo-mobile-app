import {ACTION_TYPES} from '../actions/AuthActaions';
import {UserAccount} from '../../models/User';

const initialState = {
  isAuthenticated: false,
  account: {} as UserAccount,
};

export type AuthState = Readonly<typeof initialState>;

export default (state: AuthState = initialState, action: any): AuthState => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    case ACTION_TYPES.ACCOUNT:
      return {
        ...state,
        account: action.account,
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
