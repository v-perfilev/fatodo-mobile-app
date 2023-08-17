import {UserAccount} from '../../models/User';

export type ServerState = 'PENDING' | 'UNHEALTHY' | 'HEALTHY';
export type NavigatorState = 'PENDING' | 'UNHEALTHY' | 'PUBLIC' | 'PROTECTED';

export type AuthState = {
  isActive: boolean;
  serverState: ServerState;
  navigatorState: NavigatorState;
  account: UserAccount;
  loading: boolean;
};
