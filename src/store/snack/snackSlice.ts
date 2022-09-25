import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ReduxSnack, Snack} from '../../models/Snack';
import {SnackState} from './snackType';
import {DateUtils} from '../../shared/utils/DateUtils';

const initialState: SnackState = {
  list: [],
};

const snackSlice = createSlice({
  name: 'snack',
  initialState,
  reducers: {
    enqueueSnack: (state: SnackState, action: PayloadAction<Snack>) => {
      const snack = {...action.payload, dismissed: false, key: `${DateUtils.getNowTime()}${Math.random()}`};
      state.list = [...state.list, snack];
    },

    removeSnack: (state: SnackState, action: PayloadAction<string>) => {
      const filter = (n: ReduxSnack): boolean => n.key !== action.payload;
      state.list = state.list.filter((notification) => filter(notification));
    },

    closeSnack: (state: SnackState, action: PayloadAction<string>) => {
      const isDismissAll = (n: ReduxSnack): boolean => action.payload === 'all' || n.key === action.payload;
      const handle = (n: ReduxSnack): ReduxSnack => (isDismissAll(n) ? {...n, dismissed: true} : {...n});
      state.list = state.list.map((notification) => handle(notification));
    },
  },
});

export default snackSlice;
