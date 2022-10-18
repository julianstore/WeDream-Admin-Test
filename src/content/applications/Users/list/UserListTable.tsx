import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import { ToastContainer, toast } from 'react-toastify';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { injectStyle } from 'react-toastify/dist/inject-style';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import AddUser from '../AddUser';
import ConfirmUser from '../ConfirmUser';
import * as api from 'src/store/api-client';
import { User } from 'src/store/models/user';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { _userList, _pagination, _totalCount, setTotalCount, setPagination, setUserList, setSelectedUser } from 'src/store/slices/userSlice';

if (typeof window !== 'undefined') {
  injectStyle();
}

const UserListTable = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const users = useAppSelector(_userList);
  const pagination = useAppSelector(_pagination);
  const totalCount = useAppSelector(_totalCount);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(pagination.page - 1);
  const [limit, setLimit] = useState<number>(pagination.limit);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleUpdate = (user: User) => {
    dispatch(setSelectedUser(user));
    setOpen(true);
  };

  const handleConfirm = (user: User) => {
    dispatch(setSelectedUser(user));
    setOpenConfirm(true);
  }

  const handleDelete = async (user: User) => {
    try {
      setLoading(true);
      const res = await api.deleteUser(user?.profile.userId);
      if (res.status === 200) {
        toast.success('User is deleted');
        dispatch(setPagination({ page: page + 1, limit }));
      } else {
        toast.warning(res.data.ERR_CODE);
      }
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getUserList = useCallback(async (page, limit) => {
    try {
      setLoading(true);
      const userRes = await api.getAllUsers(page, limit);
      dispatch(setUserList(userRes.users));
      dispatch(setTotalCount(parseInt(userRes.totalCount || '0')));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
    return () => {
      dispatch(setUserList(users));
      dispatch(setTotalCount(totalCount));
    }
  }, []);

  useEffect(() => {
    getUserList(pagination.page, pagination.limit);
  }, [pagination]);

  useEffect(() => {
    dispatch(setPagination({ page: page + 1, limit }));
  }, [page, limit]);

  return (
    <>
      <AddUser
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <ConfirmUser
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
        }}
      />
      <Card>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>User ID</TableCell> */}
                <TableCell>Avatar</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>BirthDate</TableCell>
                <TableCell>Confirmed Time</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                const isUserSelected = selectedUsers.includes(
                  user?.profile?.userId
                );
                return (
                  <TableRow
                    hover
                    key={user?.profile?.userId}
                    selected={isUserSelected}
                  >
                    {/* <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user?.profile?.userId}
                      </Typography>
                    </TableCell> */}
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        <Avatar
                          alt={user?.profile?.fullName}
                          src={user?.imageUrl}
                        />
                      </Typography>
                    </TableCell>
                    <TableCell style={{ maxWidth: '250px' }} title={user?.profile?.fullName || ''}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user?.profile?.fullName}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ maxWidth: '250px' }} title={user?.displayName || ''}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user?.displayName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user?.profile?.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user?.profile?.birthdate?.year} -{' '}
                        {user?.profile?.birthdate?.month}-{' '}
                        {user?.profile?.birthdate?.day}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user?.profile?.confirmedTime ? user?.profile?.confirmedTime.substr(0, 10) : '- -'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {user?.profile?.confirmedTime && <Tooltip title="Confirm Profile" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            handleConfirm(user);
                          }}
                        >
                          <CheckIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>}
                      <Tooltip title="Update Profile" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            handleUpdate(user);
                          }}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Profile" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            handleDelete(user);
                          }}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={totalCount}
            onPageChange={(_, pageNumber) => setPage(pageNumber)}
            onRowsPerPageChange={(event) => setLimit(parseInt(event.target.value))}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>
      <ToastContainer
        position="top-right"
        newestOnTop
        style={{ marginTop: 100, zIndex: '99999 !important' }}
      />
      {loading && <SuspenseLoader/>}
    </>
  );
};

UserListTable.propTypes = {
  users: PropTypes.array.isRequired,
};

UserListTable.defaultProps = {
  users: []
};

export default UserListTable;
