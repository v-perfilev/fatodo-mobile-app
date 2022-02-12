import {combineReducers} from 'redux';
import authState, {ReduxAuthState} from './rerducers/AuthReducer';
import snackState, {ReduxSnackState} from './rerducers/SnackReducer';

export interface RootState {
  readonly authState: ReduxAuthState;
  readonly snackState: ReduxSnackState;
}

export default combineReducers<RootState>({authState, snackState});
