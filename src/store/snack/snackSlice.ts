import {createSlice} from '@reduxjs/toolkit';
import {ReduxSnack, SnackState} from './snackType';

const initialState: SnackState = {
  list: [],
};

const snackSlice = createSlice({
  name: 'snack',
  initialState,
  reducers: {
    enqueueSnack: (state: SnackState, action) => ({
      list: [...state.list, action.payload],
    }),
    closeSnack: (state: SnackState, action) => {
      const isDismissAll = (n: ReduxSnack): boolean => action.payload === 'all' || n.key === action.payload;
      const handle = (n: ReduxSnack): ReduxSnack => (isDismissAll(n) ? {...n, dismissed: true} : {...n});
      const list = state.list.map((notification) => handle(notification));
      return {list};
    },
    removeSnack: (state: SnackState, action) => {
      const filter = (n: ReduxSnack): boolean => n.key !== action.payload;
      const list = state.list.filter((notification) => filter(notification));
      return {list};
    },
  },
});

export default snackSlice;
