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
    reset: (state: ItemState) => {
      Object.assign(state, initialState);
    },

    setGroup: (state: ItemState, action: PayloadAction<Group>) => {
      state.group = action.payload;
    },

    setItem: (state: ItemState, action: PayloadAction<Item>) => {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchItem
    */
    builder.addCase(ItemActions.fetchItemThunk.pending, (state: ItemState) => {
      Object.assign(state, initialState);
      state.loading = true;
    });
    builder.addCase(ItemActions.fetchItemThunk.fulfilled, (state: ItemState, action) => {
      state.item = action.payload;
      state.loading = false;
    });
    builder.addCase(ItemActions.fetchItemThunk.rejected, (state: ItemState) => {
      Object.assign(state, initialState);
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
    builder.addCase(ItemActions.createItemThunk.rejected, (state: ItemState) => {
      Object.assign(state, initialState);
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
