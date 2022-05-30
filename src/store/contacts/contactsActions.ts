import {AppDispatch} from '../store';
import contactsSlice from './contactsSlice';
import {ContactRelation} from '../../models/ContactRelation';
import {ContactRequest} from '../../models/ContactRequest';

class ContactsActions {
  static addRelation = (relation: ContactRelation) => async (dispatch: AppDispatch) => {
    dispatch(contactsSlice.actions.addRelation(relation));
  };

  static removeRelation = (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(contactsSlice.actions.removeRelation(userId));
  };

  static addIncomingRequest = (request: ContactRequest) => async (dispatch: AppDispatch) => {
    dispatch(contactsSlice.actions.addIncomingRequest(request));
  };

  static removeIncomingRequest = (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(contactsSlice.actions.removeIncomingRequest(userId));
  };

  static addOutcomingRequest = (request: ContactRequest) => async (dispatch: AppDispatch) => {
    dispatch(contactsSlice.actions.addOutcomingRequest(request));
  };

  static removeOutcomingRequest = (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(contactsSlice.actions.removeOutcomingRequest(userId));
  };
}

export default ContactsActions;
