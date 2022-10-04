import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommonState} from './commonType';

const initialState: CommonState = {
  freezeTabs: false,
  freezeCalendar: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setFreezeTabs: (state: CommonState, action: PayloadAction<boolean>) => {
      state.freezeTabs = action.payload;
    },

    setFreezeCalendar: (state: CommonState, action: PayloadAction<boolean>) => {
      state.freezeCalendar = action.payload;
    },
  },
});

export default commonSlice;
