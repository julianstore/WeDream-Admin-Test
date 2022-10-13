import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import * as api from '../api-client';
import { Pagination } from '../models/base';
import { Category } from '../models/category';

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { state: AppState }
>('dream/category/list', async () => {
  const categories = await api.getDreamCategoryList();
  return categories.categories;
});

export interface CategoryState {
  categoryList: Array<Category>;
  totalCount: number;
  selectedCategory: Category;
  pagination: Pagination;
}

const initCategoryState: CategoryState = {
  categoryList: [],
  totalCount: 0,
  selectedCategory: null,
  pagination: { page: 1, limit: 5 },
};

const categorySlice = createSlice({
  name: 'user',
  initialState: initCategoryState,

  reducers: {
    addCategory(state, action: PayloadAction<Category>) {
      state.categoryList = [action.payload, ...state.categoryList];
    },
    setCategoryList(state, action: PayloadAction<Array<Category>>) {
      state.categoryList = action.payload;
    },
    setPagination(state, action: PayloadAction<Pagination>) {
      state.pagination = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<Category>) {
      state.selectedCategory = action.payload;
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

export const { addCategory, setCategoryList, setPagination, setTotalCount, setSelectedCategory } = categorySlice.actions;

export const _categoryList = (state: any) => state.category.categoryList;
export const _totalCount = (state: any) => state.category.totalCount;
export const _selectedCategory = (state: any) => state.category.selectedCategory;
export const _pagination = (state: any) => state.category.pagination;
