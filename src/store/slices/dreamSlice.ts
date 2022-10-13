import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import * as api from '../api-client';
import { Dream } from '../models/dream';
import { Pagination } from '../models/base';

export const getDreams = createAsyncThunk<Dream[], void, { state: AppState }>(
  'dream/getList',
  async () => {
    const dreams = await api.getAllDreams();
    return dreams.dreamList;
  }
);

export interface DreamState {
  dreamList: Array<Dream>;
  totalCount: number;
  selectedDream: Dream;
  pagination: Pagination;
}

const initDreamState: DreamState = {
  dreamList: [],
  totalCount: 0,
  selectedDream: null,
  pagination: { page: 1, limit: 5 },
};

const dreamSlice = createSlice({
  name: 'dream',
  initialState: initDreamState,

  reducers: {
    addDream(state, action: PayloadAction<Dream>) {
      state.dreamList = [action.payload, ...state.dreamList];
    },
    setDreamList(state, action: PayloadAction<Array<Dream>>) {
      state.dreamList = action.payload;
    },
    setPagination(state, action: PayloadAction<Pagination>) {
      state.pagination = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setSelectedDream(state, action: PayloadAction<Dream>) {
      state.selectedDream = action.payload;
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

export const { addDream, setDreamList, setPagination, setTotalCount, setSelectedDream } = dreamSlice.actions;

export const _dreamList = (state: any) => state.dream.dreamList;
export const _totalCount = (state: any) => state.dream.totalCount;
export const _selectedDream = (state: any) => state.dream.selectedDream;
export const _pagination = (state: any) => state.dream.pagination;
