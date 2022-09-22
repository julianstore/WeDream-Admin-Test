import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Profile } from '../models/user';
import { AppState } from '../store';
import * as api from '../api-client';
export const getUsers = createAsyncThunk<User[], void, { state: AppState }>(
  'user/getList',
  async () => {
    const users = await api.getAllUsers();
    return users.users;
  }
);

export interface UserState {
  userList: User[];
  selectedUser: User;
}

const initUserState: UserState = {
  userList: [],
  selectedUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: initUserState,

  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.userList = [action.payload, ...state.userList];
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

export const { addUser } = userSlice.actions;

export const _userList = (state: any) => state.user.userList;
