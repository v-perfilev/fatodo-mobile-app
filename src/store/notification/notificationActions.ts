import notificationSlice from './notificationSlice';
import {AppDispatch} from '../store';
import {Event} from '../../models/Event';
import {InfoActions} from '../info/infoActions';

export class NotificationActions {
  static add = (event: Event) => (dispatch: AppDispatch) => {
    dispatch(InfoActions.loadDependenciesThunk([event]));
    dispatch(notificationSlice.actions.add(event));
  };

  static remove = () => (dispatch: AppDispatch) => {
    dispatch(notificationSlice.actions.remove());
  };
}
