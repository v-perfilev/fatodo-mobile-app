import {combineReducers} from 'redux';
import authState, {AuthState} from './rerducers/AuthReducer';

export interface RootState {
  readonly authState: AuthState;
}

export default combineReducers<RootState>({authState});
