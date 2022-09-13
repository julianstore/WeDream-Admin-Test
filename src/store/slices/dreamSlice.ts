import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dream } from '../models/dream';
import { AppState } from '../store';
import * as api from '../api-client';
export const getDreams = createAsyncThunk<Dream[], void, { state: AppState }>(
  'dream/getList',
  async () => {
    const dreams = await api.getDreams();
    return dreams;
  }
);

export interface DreamState {
  dreamList: Dream[];
}

const initDreamState: DreamState = {
  dreamList: []
};

const dreamSlice = createSlice({
  name: 'dream',
  initialState: initDreamState,

  reducers: {
    addDream(state, action: PayloadAction<Dream>) {
      state.dreamList = [action.payload, ...state.dreamList];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDreams.fulfilled, (state, action) => {
      state.dreamList = action.payload;
    });
  }
});

// here's you a reducer
export default dreamSlice.reducer;

export const { addDream } = dreamSlice.actions;

export const _dreamList = (state: any) => state.dream.dreamList;
