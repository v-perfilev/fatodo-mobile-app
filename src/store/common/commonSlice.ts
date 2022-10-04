import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommonState} from './commonType';

const initialState: CommonState = {
  freeze: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setFreeze: (state: CommonState, action: PayloadAction<boolean>) => {
      state.freeze = action.payload;
    },
  },
});

export default commonSlice;
