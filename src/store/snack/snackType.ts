import {Snack} from '../../models/Snack';

export interface ReduxSnack extends Snack {
  key: string;
  dismissed: boolean;
}

export type SnackState = {
  list: ReduxSnack[];
};
