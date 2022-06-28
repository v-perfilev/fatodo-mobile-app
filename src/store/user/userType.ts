import {User} from '../../models/User';
import {Group} from '../../models/Group';

export type UserState = {
  user: User;
  groups: Group[];
  loading: boolean;
};
