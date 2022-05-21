import {UserAccount} from '../../models/User';

export type AuthState = {
  isAuthenticated: boolean;
  account: UserAccount;
  loading: boolean;
};
