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

import { Dream } from 'src/store/models/dream';
import AddDream from '../AddDream';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import * as api from 'src/store/api-client';
import { useAppDispatch } from 'src/store/hooks';
import { getDreams } from 'src/store/slices/dreamSlice';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer, toast } from 'react-toastify';

interface DreamListTableProps {
  className?: string;
  dreams: Dream[];
}

const applyPagination = (
  dreams: Dream[],
  page: number,
  limit: number
): Dream[] => {
  return dreams.slice(page * limit, page * limit + limit);
};

if (typeof window !== 'undefined') {
  injectStyle();
}

const DreamListTable: FC<DreamListTableProps> = ({ dreams }) => {
  const [selectedDreams, setSelectedDreams] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const [open, setOpen] = useState(false);
  const [updateDream, setUpdateDream] = useState(null);

  const dispatch = useAppDispatch();

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedDreams = applyPagination(dreams, page, limit);
  const theme = useTheme();

  const handleUpdate = () => {
    setOpen(true);
  };

  const handleDelete = async (dream: Dream) => {
    await api.deleteDream(dream?.dreamId).then((res) => {
      if (res.status === 200) {
        toast.success('Dream is deleted');
        dispatch(getDreams());
      } else {
        toast.warning(res.data.ERR_CODE);
      }
    });
  };
  return (
    <>
      <AddDream
        open={open}
        selectedDream={updateDream}
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
                <TableCell>Dream ID</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Background</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>AuctionID</TableCell>
                <TableCell>IsFeatured</TableCell>
                <TableCell>Allow Avatar Accessories</TableCell>
                <TableCell>Allow Gadgets</TableCell>
                <TableCell>Allow Dream Editing</TableCell>
                <TableCell>Allow BroadCasting</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDreams.map((dream) => {
                const isDreamSelected = selectedDreams.includes(dream?.dreamId);
                return (
                  <TableRow
                    hover
                    key={dream?.dreamId}
                    selected={isDreamSelected}
                  >
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {dream?.dreamId}
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
                        {dream?.categoryName}
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
                        {dream?.background}
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
                        {dream?.ownerDisplayName}
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
                        {dream?.title}
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
                        {dream?.description}
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
                        {dream?.auctionId}
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
                        {dream?.isFeatured ? 'Y' : 'N'}
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
                        {dream?.allowAvatarAccessories ? 'Y' : 'N'}
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
                        {dream?.allowGadgets ? 'Y' : 'N'}
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
                        {dream?.allowDreamEditing ? 'Y' : 'N'}
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
                        {dream?.allowBroadcasting ? 'Y' : 'N'}
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
                        {dream?.startTime}
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
                        {dream?.endTime}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Update Dream" arrow>
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
                            setUpdateDream(dream);
                            handleUpdate();
                          }}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Dream" arrow>
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
                            handleDelete(dream);
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
            count={dreams.length}
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

DreamListTable.propTypes = {
  dreams: PropTypes.array.isRequired
};

DreamListTable.defaultProps = {
  dreams: []
};

export default DreamListTable;
