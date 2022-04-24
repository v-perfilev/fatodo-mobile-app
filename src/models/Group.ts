import {User} from './User';
import {ColorScheme} from '../shared/themes/ThemeFactory';

export interface Group {
  id: string;
  title: string;
  color: ColorScheme;
  imageFilename: string;
  members: GroupMember[];
}

export type GroupPermission = 'ADMIN' | 'EDIT' | 'READ';

export interface GroupMember {
  id: string;
  permission: GroupPermission;
}

export type GroupUser = GroupMember & User;
