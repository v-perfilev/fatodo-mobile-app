import {AppDispatch} from '../store';
import {User} from '../../models/User';
import usersSlice from './usersSlice';

class UsersActions {
  static handleUsers = (users: User[]) => async (dispatch: AppDispatch) => {
    dispatch(usersSlice.actions.handleUsers(users));
  };
}

export default UsersActions;
