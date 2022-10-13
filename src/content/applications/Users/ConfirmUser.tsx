import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { Box, TextField, FormControl, InputLabel } from '@mui/material';

import * as api from '../../../store/api-client';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { _pagination, _selectedUser, setPagination } from 'src/store/slices/userSlice';

if (typeof window !== 'undefined') {
  injectStyle();
}

function ConfirmUser(props) {
  const { onClose, open,  } = props;
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(_pagination);
  const selectedUser = useAppSelector(_selectedUser);

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [userLoginId, setUserLoginId] = useState('');
  const [source, setSource] = useState(parseInt(process.env.REACT_APP_ADMIN_SOURCE) || 3);

  useEffect(() => {
    setUserLoginId(selectedUser?.profile?.email || '');
  }, [selectedUser]);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const res = await api.confirmUser(userLoginId, code, source);
      if (res.status === 200) {
        toast.success('User is confirmed');
        dispatch(setPagination({ page: pagination.page, limit: pagination.limit }));
      } else {
        toast.warning(res.data.ERR_CODE);
      }
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle>Confirm User</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: '100%'
            }}
          >
            <FormControl variant='standard' sx={{ m: 1 }}>
              <TextField
                label="User Login Id"
                type="text"
                name="user_login_id"
                value={userLoginId}
                variant="standard"
                aria-readonly
                fullWidth
              />
            </FormControl>
            <FormControl variant='standard' sx={{ m: 1 }}>
              <TextField
                label="Verification Code"
                type="text"
                name="verification_code"
                value={code}
                variant="standard"
                required
                fullWidth
                onChange={(e) => setCode(e.target.value)}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
        <ToastContainer
          position="top-right"
          newestOnTop
          style={{ marginTop: 100, zIndex: '99999 !important' }}
        />
        {loading && <SuspenseLoader/>}
      </Dialog>
    </>
  );
}

export default ConfirmUser;
