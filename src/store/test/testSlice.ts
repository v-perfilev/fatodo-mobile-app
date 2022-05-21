import {createSlice} from '@reduxjs/toolkit';
import {TestState} from './testType';

const initialState: TestState = {};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default testSlice;
