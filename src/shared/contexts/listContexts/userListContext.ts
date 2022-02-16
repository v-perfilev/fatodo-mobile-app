import * as React from 'react';
import {useContext} from 'react';
import {User} from '../../../models/User';

export interface UserListState {
  users: User[];
  handleUserIds: (ids: string[]) => void;
  handleUsers: (users: User[]) => void;
  loading: boolean;
}

export const UserListContext = React.createContext<UserListState>(null);
export const useUserListContext = (): UserListState => useContext(UserListContext);
