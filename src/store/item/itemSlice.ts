import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ItemState} from './itemType';
import {ItemActions} from './itemActions';
import {Item} from '../../models/Item';
import {Group} from '../../models/Group';

const initialState: ItemState = {
  item: undefined,
  group: undefined,
  reminders: [],
  loading: false,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    reset: () => initialState,

    setGroup: (state: ItemState, action: PayloadAction<Group>) => {
      const group = action.payload;
      return {...initialState, group};
    },

    setItem: (state: ItemState, action: PayloadAction<Item>) => {
      const item = action.payload;
      return {...initialState, item};
    },
  },
  extraReducers: (builder) => {
    /*
    fetchItem
    */
    builder.addCase(ItemActions.fetchItemThunk.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(ItemActions.fetchItemThunk.fulfilled, (state: ItemState, action) => {
      state.item = action.payload;
      state.loading = false;
    });
    builder.addCase(ItemActions.fetchItemThunk.rejected, () => {
      return {...initialState};
    });

    /*
    fetchGroup
    */
    builder.addCase(ItemActions.fetchGroupThunk.fulfilled, (state: ItemState, action) => {
      state.group = action.payload;
    });

    /*
    fetchReminders
    */
    builder.addCase(ItemActions.fetchRemindersThunk.fulfilled, (state: ItemState, action) => {
      state.reminders = action.payload;
    });

    /*
    createItem
    */
    builder.addCase(ItemActions.createItemThunk.pending, (state: ItemState) => {
      state.loading = true;
    });
    builder.addCase(ItemActions.createItemThunk.fulfilled, (state: ItemState, action) => {
      state.item = action.payload;
      state.reminders = action.meta.arg.reminders;
      state.loading = false;
    });
    builder.addCase(ItemActions.createItemThunk.rejected, () => {
      return {...initialState};
    });

    /*
    updateItem
    */
    builder.addCase(ItemActions.updateItemThunk.pending, (state: ItemState) => {
      state.loading = true;
    });
    builder.addCase(ItemActions.updateItemThunk.fulfilled, (state: ItemState, action) => {
      state.item = action.payload;
      state.reminders = action.meta.arg.reminders;
      state.loading = false;
    });
    builder.addCase(ItemActions.updateItemThunk.rejected, (state: ItemState) => {
      state.loading = false;
    });
  },
});

export default itemSlice;
