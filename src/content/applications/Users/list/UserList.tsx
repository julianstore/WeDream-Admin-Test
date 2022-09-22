import { useState, useEffect, useCallback } from 'react';
import { Card } from '@mui/material';

import UserListTable from './UserListTable';
import SuspenseLoader from 'src/components/SuspenseLoader';
import * as api from 'src/store/api-client'
import { Pagination } from 'src/store/models/base';

function UserList() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 5 });

  const getAllUsers = useCallback(async (page, limit) => {
    try {
      setLoading(true);
      const userRes = await api.getAllUsers(page, limit);
      setUsers(userRes.users);
      setTotalCount(parseInt(userRes.totalCount) || 0);
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllUsers(pagination.page, pagination.limit);
  }, [pagination]);

  return (
    <Card>
      <UserListTable users={users} totalCount={totalCount} setPagination={setPagination} />
      {loading && <SuspenseLoader/>}
    </Card>
  );
}

export default UserList;
