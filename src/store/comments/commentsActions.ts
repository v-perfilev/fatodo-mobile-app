import {createAsyncThunk} from '@reduxjs/toolkit';

enum TYPES {
  TEST = 'TEST',
}

export class CommentsThunks {
  static test = createAsyncThunk(TYPES.TEST, async () => {
    console.log('TEST');
  });
}
