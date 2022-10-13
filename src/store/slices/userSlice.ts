import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import * as api from '../api-client';
import { User } from '../models/user';
import { Pagination } from '../models/base';

export const getUsers = createAsyncThunk<User[], void, { state: AppState }>(
  'user/getList',
  async () => {
    const users = await api.getAllUsers();
    return users.users;
  }
);

export interface UserState {
  userList: Array<User>;
  totalCount: number;
  selectedUser: User;
  pagination: Pagination;
}

const initUserState: UserState = {
  userList: [],
  totalCount: 0,
  selectedUser: null,
  pagination: { page: 1, limit: 5 },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initUserState,

  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.userList = [action.payload, ...state.userList];
    },
    setUserList(state, action: PayloadAction<Array<User>>) {
      state.userList = action.payload;
    },
    setPagination(state, action: PayloadAction<Pagination>) {
      state.pagination = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  }
});

// here's you a reducer
export default userSlice.reducer;

export const { addUser, setUserList, setPagination, setTotalCount, setSelectedUser } = userSlice.actions;

export const _userList = (state: any) => state.user.userList;
export const _totalCount = (state: any) => state.user.totalCount;
export const _selectedUser = (state: any) => state.user.selectedUser;
export const _pagination = (state: any) => state.user.pagination;