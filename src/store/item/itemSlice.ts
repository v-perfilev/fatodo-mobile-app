import {createSlice} from '@reduxjs/toolkit';
import {ItemState} from './itemType';
import ItemThunks from './itemThunks';

const initialState: ItemState = {
  item: undefined,
  reminders: [],
  loading: false,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*
    fetchItem
    */
    builder.addCase(ItemThunks.fetchItem.pending, () => ({
      ...initialState,
      loading: true,
    }));
    builder.addCase(ItemThunks.fetchItem.fulfilled, (state, action) => ({
      ...state,
      item: action.payload,
      loading: false,
    }));
    builder.addCase(ItemThunks.fetchItem.rejected, () => ({
      ...initialState,
    }));

    /*
    fetchReminders
    */
    builder.addCase(ItemThunks.fetchReminders.fulfilled, (state, action) => ({
      ...state,
      reminders: action.payload,
    }));

    /*
    createItem
    */
    builder.addCase(ItemThunks.createItem.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ItemThunks.createItem.fulfilled, (state, action) => ({
      ...state,
      item: action.payload,
      reminders: action.meta.arg.reminders,
      loading: false,
    }));
    builder.addCase(ItemThunks.createItem.rejected, () => ({
      ...initialState,
      loading: false,
    }));

    /*
    updateItem
    */
    builder.addCase(ItemThunks.updateItem.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(ItemThunks.updateItem.fulfilled, (state, action) => ({
      ...state,
      item: action.payload,
      reminders: action.meta.arg.reminders,
      loading: false,
    }));
    builder.addCase(ItemThunks.updateItem.rejected, () => ({
      ...initialState,
      loading: false,
    }));
  },
});

export default itemSlice;
