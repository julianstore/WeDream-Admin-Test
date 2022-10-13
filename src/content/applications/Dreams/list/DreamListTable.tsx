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
import { ToastContainer, toast } from 'react-toastify';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { injectStyle } from 'react-toastify/dist/inject-style';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import AddDream from '../AddDream';
import * as api from 'src/store/api-client';
import { Dream } from 'src/store/models/dream';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { _dreamList, _pagination, _totalCount, setTotalCount, setPagination, setDreamList, setSelectedDream } from 'src/store/slices/dreamSlice';

if (typeof window !== 'undefined') {
  injectStyle();
}

const DreamListTable = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const dreams = useAppSelector(_dreamList);
  const pagination = useAppSelector(_pagination);
  const totalCount = useAppSelector(_totalCount);

  const [selectedDreams, setSelectedDreams] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(pagination.page - 1);
  const [limit, setLimit] = useState<number>(pagination.limit);
  const [open, setOpen] = useState(false);

  const handleUpdate = (dream: Dream) => {
    dispatch(setSelectedDream(dream));
    setOpen(true);
  };

  const handleDelete = async (dream: Dream) => {
    try {
      setLoading(true);
      const res = await api.deleteDream(dream?.dreamId);
      if (res.status === 200) {
        toast.success('Dream is deleted');
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

  const getDreamList = useCallback(async (page, limit) => {
    try {
      setLoading(true);
      const dreamRes = await api.getAllDreams(page, limit);
      dispatch(setDreamList(dreamRes.dreamList));
      dispatch(setTotalCount(parseInt(dreamRes.totalCount || '0')));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDreamList(pagination.page, pagination.limit);
  }, [pagination]);

  useEffect(() => {
    dispatch(setPagination({ page: page + 1, limit }));
  }, [page, limit]);

  return (
    <>
      <AddDream
        open={open}
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
                <TableCell>ID</TableCell>
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
              {dreams.map((dream) => {
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
                    <TableCell style={{ maxWidth: '250px' }} title={dream?.title || ''}>
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
                    <TableCell style={{ maxWidth: '250px' }} title={dream?.description || ''}>
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
                            handleUpdate(dream);
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

DreamListTable.propTypes = {
  dreams: PropTypes.array.isRequired
};

DreamListTable.defaultProps = {
  dreams: []
};

export default DreamListTable;
