import {User} from '../../models/User';
import {Group} from '../../models/Group';
import {ContactRelation} from '../../models/Contact';

export type UserState = {
  user: User;
  groups: Group[];
  relations: ContactRelation[];
};
