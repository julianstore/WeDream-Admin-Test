import { Card } from '@mui/material';
import UserListTable from './UserListTable';
import { getUsers, _userList } from 'src/store/slices/userSlice';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

function UserList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const userList = useAppSelector(_userList);
  return (
    <Card>
      <UserListTable users={userList} />
    </Card>
  );
}

export default UserList;
