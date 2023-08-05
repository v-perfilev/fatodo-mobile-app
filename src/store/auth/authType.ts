import {UserAccount} from '../../models/User';

export type AppStatus = 'READY' | 'HEALTHY' | 'UNHEALTHY' | 'LOADING';

export type AuthState = {
  isActive: boolean;
  isAuthenticated: boolean;
  appStatus: AppStatus;
  account: UserAccount;
  loading: boolean;
};
