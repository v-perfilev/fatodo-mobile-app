import {UserAccount} from '../../models/User';

export type AuthState = {
  isActive: boolean;
  isSleepMode: boolean;
  isAuthenticated: boolean;
  account: UserAccount;
  loading: boolean;
};
