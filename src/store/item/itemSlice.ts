import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ItemState} from './itemType';
import {ItemThunks} from './itemActions';
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
    builder.addCase(ItemThunks.fetchItem.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(ItemThunks.fetchItem.fulfilled, (state: ItemState, action) => {
      state.item = action.payload;
      state.loading = false;
    });
    builder.addCase(ItemThunks.fetchItem.rejected, () => {
      return {...initialState};
    });

    /*
    fetchGroup
    */
    builder.addCase(ItemThunks.fetchGroup.fulfilled, (state: ItemState, action) => {
      state.group = action.payload;
    });

    /*
    fetchReminders
    */
    builder.addCase(ItemThunks.fetchReminders.fulfilled, (state: ItemState, action) => {
      state.reminders = action.payload;
    });

    /*
    createItem
    */
    builder.addCase(ItemThunks.createItem.pending, (state: ItemState) => {
      state.loading = true;
    });
    builder.addCase(ItemThunks.createItem.fulfilled, (state: ItemState, action) => {
      state.item = action.payload;
      state.reminders = action.meta.arg.reminders;
      state.loading = false;
    });
    builder.addCase(ItemThunks.createItem.rejected, () => {
      return {...initialState};
    });

    /*
    updateItem
    */
    builder.addCase(ItemThunks.updateItem.pending, (state: ItemState) => {
      state.loading = true;
    });
    builder.addCase(ItemThunks.updateItem.fulfilled, (state: ItemState, action) => {
      state.item = action.payload;
      state.reminders = action.meta.arg.reminders;
      state.loading = false;
    });
    builder.addCase(ItemThunks.updateItem.rejected, (state: ItemState) => {
      state.loading = false;
    });
  },
});

export default itemSlice;
