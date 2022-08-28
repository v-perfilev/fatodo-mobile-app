import {UserAccount} from '../../models/User';

export type AuthState = {
  isActive: boolean;
  isAuthenticated: boolean;
  account: UserAccount;
  loading: boolean;
};
