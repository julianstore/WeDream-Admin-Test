import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../models/category';
import { AppState } from '../store';
import * as api from '../api-client';
export const getCategories = createAsyncThunk<
  Category[],
  void,
  { state: AppState }
>('dream/category/list', async () => {
  const categories = await api.getDreamCategoryList();
  return categories.categories;
});

export interface CategoryState {
  categoryList: Category[];
}

const initCategoryState: CategoryState = {
  categoryList: []
};

const categorySlice = createSlice({
  name: 'user',
  initialState: initCategoryState,

  reducers: {
    addCategory(state, action: PayloadAction<Category>) {
      state.categoryList = [action.payload, ...state.categoryList];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categoryList = action.payload;
    });
  }
});

// here's you a reducer
export default categorySlice.reducer;

export const { addCategory } = categorySlice.actions;

export const _categoryList = (state: any) => state.category.categoryList;
