import {AppDispatch} from '../store';
import contactsSlice from './contactsSlice';

export class ContactActions {
  static addRelation = (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(contactsSlice.actions.addRelation(userId));
  };
}

export default ContactActions;
