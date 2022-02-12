import {ACTION_TYPES} from '../actions/AuthActions';
import {UserAccount} from '../../models/User';

const initialState = {
  isAuthenticated: false,
  account: {} as UserAccount,
};

export type ReduxAuthState = Readonly<typeof initialState>;

export default (state: ReduxAuthState = initialState, action: any): ReduxAuthState => {
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
