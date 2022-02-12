import Snack from '../../models/Snack';
import {ACTION_TYPES} from '../actions/SnackActions';

export interface ReduxSnack extends Snack {
  key: string;
  dismissed: boolean;
}

const initialReduxSnackState = {
  list: [] as ReduxSnack[],
};

export type ReduxSnackState = Readonly<typeof initialReduxSnackState>;

export default (state: ReduxSnackState = initialReduxSnackState, action: any): ReduxSnackState => {
  switch (action.type) {
    case ACTION_TYPES.ENQUEUE_SNACKBAR:
      return {
        list: [...state.list, action.snack],
      };
    case ACTION_TYPES.CLOSE_SNACKBAR:
      const isDismissAll = (n: ReduxSnack): boolean => action.key === 'all' || n.key === action.key;
      const handle = (n: ReduxSnack): ReduxSnack => (isDismissAll(n) ? {...n, dismissed: true} : {...n});
      return {
        list: state.list.map((notification) => handle(notification)),
      };
    case ACTION_TYPES.REMOVE_SNACKBAR:
      const filter = (n: ReduxSnack): boolean => n.key !== action.key;
      return {
        list: state.list.filter((notification) => filter(notification)),
      };
    default:
      return state;
  }
};
