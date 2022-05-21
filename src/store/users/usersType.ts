import {User} from '../../models/User';

export type UsersState = {
  users: User[];
  loadingIds: string[];
  loading: boolean;
};
