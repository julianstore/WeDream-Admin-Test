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
  TextField,
  FormControl,
  useTheme
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import * as api from 'src/store/api-client';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';

import { _dreamList, _pagination, _totalCount, setTotalCount as setDreamTotalCount, setPagination, setDreamList, setSelectedDream } from 'src/store/slices/dreamSlice';

if (typeof window !== 'undefined') {
  injectStyle();
}

const VoiceRequestListTable = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const dreams = useAppSelector(_dreamList);

  const [dream, setDream] = useState('');
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);

  const getDreamList = useCallback(async (page, limit) => {
    try {
      setLoading(true);
      const dreamRes = await api.getAllDreams(page, limit);
      dispatch(setDreamList(dreamRes.dreamList));
      dispatch(setDreamTotalCount(parseInt(dreamRes.totalCount || '0')));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const getVoiceRequestList = useCallback(async (page, limit, dreamId) => {
    try {
      setLoading(true);
      const voiceRequestRes = await api.ListDreamVoiceRequests(page, limit, dreamId);
      setRequests(voiceRequestRes.requests);
      setTotalCount(parseInt(voiceRequestRes.totalCount || '0'));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getVoiceRequestList(page + 1, limit, dream);
  }, [dream, page, limit])

  useEffect(() => {
    const newPagination = { page: 1, limit: 99999 };
    getDreamList(newPagination.page, newPagination.limit);
  }, []);

  return (
    <>
      <Card>
        <Box>
          <FormControl variant='standard' sx={{ m: 1 }} style={{ width: '50%' }}>
            <TextField
              id="outlined-select-dream"
              select
              label="Please select dream"
              value={dream}
              onChange={(e) => setDream(e.target.value)}
            >
              {dreams.map((item) => (
                <MenuItem key={item.dreamId} value={item.dreamId}>
                  {item.title} (CategoryName: {item.categoryName})
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Request Time</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Streaming</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => {
                return (
                  <TableRow
                    hover
                    key={request?.requestId}
                  >
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {request?.requestId}
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
                        alt={request?.user?.fullName}
                        src={request?.photoUrl}
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
                        {request?.user?.displayName}
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
                        {request?.user?.fullName}
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
                        {request?.requestTime ? request?.requestTime.replace('T', ' ').replace('Z', ' ') : '- -' }
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
                        {request?.user?.isAdmin && <CheckIcon/>}
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
                        {request?.user?.isStreaming && <CheckIcon/>}
                      </Typography>
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

VoiceRequestListTable.propTypes = {
  categories: PropTypes.array.isRequired
};

VoiceRequestListTable.defaultProps = {
  categories: []
};

export default VoiceRequestListTable;
