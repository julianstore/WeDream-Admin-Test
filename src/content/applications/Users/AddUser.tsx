import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer, toast } from 'react-toastify';
import { Box, TextField } from '@mui/material';
import * as api from '../../../store/api-client';
import { useState, useEffect } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { getUsers } from 'src/store/slices/userSlice';
import {
  MAIL_VALIDATION_REGEX,
  PHONE_NUMBER_VALIDATION_REGEX
} from '../../../utils/constants';

if (typeof window !== 'undefined') {
  injectStyle();
}

function AddUser(props) {
  const { onClose, selectedUser, open } = props;

  const today = new Date();

  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');
  const [phone, setPhone] = useState('');
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  useEffect(() => {
    if (selectedUser !== null && selectedUser !== undefined) {
      setFirstName(selectedUser.profile.firstName);
      setLastName(selectedUser.profile.lastName);
      setDisplayName(selectedUser.displayName);
      setEmail(selectedUser.profile.email);
      setPhone(selectedUser.profile.phone);
      setYear(selectedUser.profile.birthdate.year);
      setMonth(selectedUser.profile.birthdate.month);
      setDay(selectedUser.profile.birthdate.day);
    }
  }, [selectedUser]);

  const handleClose = () => {
    onClose();
  };

  const validation = () => {
    if (!email.match(MAIL_VALIDATION_REGEX)) {
      toast.warning('Email is invalid. Please check again!');
      return;
    }
    if (!phone.match(PHONE_NUMBER_VALIDATION_REGEX)) {
      toast.warning('Phone is invalid. Please check again!');
      return;
    }
    if (password !== rePassword && password !== '') {
      toast.warning('Password is not match. Please check again!');
      return;
    }
    return true;
  };

  const handleSave = async () => {
    if (validation()) {
      if (selectedUser !== null && selectedUser !== undefined) {
        await api
          .updateUser(
            selectedUser.userId,
            firstName,
            lastName,
            displayName,
            email,
            year,
            month,
            day
          )
          .then((res) => {
            if (res.status === 200) {
              toast.success('User is updated');
              dispatch(getUsers());
              handleClose();
            } else {
              toast.warning(res.data.ERR_CODE);
            }
          });
      } else {
        await api
          .addUser(
            firstName,
            lastName,
            displayName,
            email,
            phone,
            year,
            month,
            day,
            password
          )
          .then((res) => {
            if (res.status === 200) {
              toast.success('New user is created');
              dispatch(getUsers());
              handleClose();
            } else {
              toast.warning(res.data.ERR_CODE);
            }
          });
      }
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
        <DialogTitle>
          {' '}
          {selectedUser === null || selectedUser === undefined
            ? `Add User`
            : `Update User`}{' '}
        </DialogTitle>
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
            <TextField
              label="First Name"
              type="text"
              name="first_name"
              value={firstName}
              variant="standard"
              required
              fullWidth
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              type="text"
              name="last_name"
              value={lastName}
              variant="standard"
              required
              fullWidth
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Display Name"
              type="text"
              name="display_name"
              value={displayName}
              variant="standard"
              required
              fullWidth
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={email}
              variant="standard"
              placeholder="example@gmail.com"
              required
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Phone"
              type="tel"
              name="phone"
              value={phone}
              variant="standard"
              placeholder="+1234567890"
              required
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              label="Year"
              type="number"
              name="year"
              value={year}
              variant="standard"
              placeholder={year.toString()}
              required
              fullWidth
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
            <TextField
              label="Month"
              type="number"
              name="month"
              value={month}
              variant="standard"
              placeholder={month.toString()}
              required
              fullWidth
              onChange={(e) => setMonth(parseInt(e.target.value))}
            />
            <TextField
              label="Day"
              type="number"
              name="day"
              value={day}
              variant="standard"
              placeholder={day.toString()}
              required
              fullWidth
              onChange={(e) => setDay(parseInt(e.target.value))}
            />
            {(selectedUser === null || selectedUser === undefined) && (
              <>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  variant="standard"
                  required
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  label="Re-Password"
                  type="password"
                  name="rePassword"
                  value={rePassword}
                  variant="standard"
                  required
                  fullWidth
                  onChange={(e) => setRepassword(e.target.value)}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
        <ToastContainer
          position="top-right"
          newestOnTop
          style={{ marginTop: 100, zIndex: '99999 !important' }}
        />
      </Dialog>
    </>
  );
}

export default AddUser;
