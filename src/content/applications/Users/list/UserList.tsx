import { useState, useEffect, useCallback } from 'react';
import { Card } from '@mui/material';

import UserListTable from './UserListTable';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getUsers, _userList } from 'src/store/slices/userSlice';
import * as api from 'src/store/api-client'

function UserList() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const userRes = await api.getAllUsers();
      setUsers(userRes.users);
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Card>
      <UserListTable users={users} />
      {loading && <SuspenseLoader/>}
    </Card>
  );
}

export default UserList;
