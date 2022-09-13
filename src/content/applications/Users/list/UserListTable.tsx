import { FC, ChangeEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
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

import { User } from 'src/store/models/user';
import AddUser from '../AddUser';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import * as api from 'src/store/api-client';
import { useAppDispatch } from 'src/store/hooks';
import { getUsers } from 'src/store/slices/userSlice';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer, toast } from 'react-toastify';

interface UserListTableProps {
  className?: string;
  users: User[];
}

const applyPagination = (
  users: User[],
  page: number,
  limit: number
): User[] => {
  return users.slice(page * limit, page * limit + limit);
};

if (typeof window !== 'undefined') {
  injectStyle();
}

const UserListTable: FC<UserListTableProps> = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const [open, setOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);

  const dispatch = useAppDispatch();

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedUsers = applyPagination(users, page, limit);
  const theme = useTheme();

  const handleUpdate = () => {
    setOpen(true);
  };

  const handleDelete = async (user: User) => {
    await api.deleteUser(user?.profile.userId).then((res) => {
      if (res.status === 200) {
        toast.success('User is deleted');
        dispatch(getUsers());
      } else {
        toast.warning(res.data.ERR_CODE);
      }
    });
  };
  return (
    <>
      <AddUser
        open={open}
        selectedUser={updateUser}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Card>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => {
                const isUserSelected = selectedUsers.includes(
                  user?.profile?.userId
                );
                return (
                  <TableRow
                    hover
                    key={user?.profile?.userId}
                    selected={isUserSelected}
                  >
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user?.profile?.userId}
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
                        <Avatar
                          alt={user?.profile?.fullName}
                          src={user?.imageUrl}
                        />
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
                        {user?.profile?.fullName}
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
                    <TableCell align="right">
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
                            setUpdateUser(user);
                            handleUpdate();
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
            count={users.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
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
    </>
  );
};

UserListTable.propTypes = {
  users: PropTypes.array.isRequired
};

UserListTable.defaultProps = {
  users: []
};

export default UserListTable;
