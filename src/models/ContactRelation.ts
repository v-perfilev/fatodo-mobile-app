import {User} from './User';

export interface ContactRelation {
  id: string;
  firstUserId: string;
  secondUserId: string;
}

export interface ContactRelationWithUser extends ContactRelation {
  user: User;
}
