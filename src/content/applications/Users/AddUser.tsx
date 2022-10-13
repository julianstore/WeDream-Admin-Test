import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import en from 'react-phone-number-input/locale/en.json';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import { Box, MenuItem, Select, TextField, styled, FormControl, InputLabel } from '@mui/material';

import {
  MAIL_VALIDATION_REGEX,
} from '../../../utils/constants';
import * as api from '../../../store/api-client';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { _pagination, _selectedUser, setPagination } from 'src/store/slices/userSlice';

if (typeof window !== 'undefined') {
  injectStyle();
}

function AddUser(props) {
  const { onClose, open } = props;
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(_pagination);
  const selectedUser = useAppSelector(_selectedUser);

  const today = new Date();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneRegion, setPhoneRegion] = useState('US');
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  useEffect(() => {
    if (selectedUser) {
      setFirstName(selectedUser.profile.firstName);
      setLastName(selectedUser.profile.lastName);
      setDisplayName(selectedUser.displayName);
      setEmail(selectedUser.profile.email);
      setPhoneNumber(selectedUser.profile.phone?.number || '');
      setPhoneRegion(selectedUser.profile.phone?.region || 'US');
      setYear(selectedUser.profile.birthdate?.year || today.getFullYear());
      setMonth(selectedUser.profile.birthdate?.month || today.getMonth() + 1);
      setDay(selectedUser.profile.birthdate?.day || today.getDate());
    } else {
      setFirstName('');
      setLastName('');
      setDisplayName('');
      setEmail('');
      setPhoneNumber('');
      setPhoneRegion('US');
      setPassword('');
      setRepassword('');
      setYear(today.getFullYear());
      setMonth(today.getMonth() + 1);
      setDay(today.getDate());
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
    if (password !== rePassword && password !== '') {
      toast.warning('Password is not match. Please check again!');
      return;
    }
    return true;
  };

  const handleSave = async () => {
    if (validation()) {
      try {
        setLoading(true);
        if (selectedUser) {
          const res = await api.updateUser(selectedUser.userId, firstName, lastName, displayName, selectedUser.profile.bio || '', { year, month, day: day + 1 }, selectedUser.isAdmin, 0);
          if (res.status === 200) {
            toast.success('User is updated');
            dispatch(setPagination({ page: pagination.page, limit: pagination.limit }));
          } else {
            toast.warning(res.data.ERR_CODE);
          }
        } else {
          const res = await api.addUser(firstName, lastName, displayName, email, { region: phoneRegion, number: phoneNumber }, { year: year, month: month, day: day + 1 }, password);
          if (res.status === 200) {
            toast.success('New user is created');
            dispatch(setPagination({ page: pagination.page, limit: pagination.limit }));
          } else {
            toast.warning(res.data.ERR_CODE);
          }
        }
      } catch(ex) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning('Invalidate input values')
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
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <FormControl variant='standard' sx={{ m: 1 }}>
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
              </FormControl>
              <FormControl variant='standard' sx={{ m: 1 }}>
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
              </FormControl>
            </div>

            <FormControl variant='standard' sx={{ m: 1 }}>
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
            </FormControl>

            <FormControl variant='standard' sx={{ m: 1 }}>
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
            </FormControl>

            <InputLabel sx={{ m: 1 }}>Phone Number</InputLabel>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Select value={phoneRegion} style={{ height: '30px' }} sx={{ m: 1 }} onChange={(e) => setPhoneRegion(e.target.value)}>
                {getCountries().map((country) => (
                  <MenuItem value={country} key={country}>{en[country]} + {getCountryCallingCode(country)}</MenuItem>
                ))}
              </Select>
              <TextField
                sx={{ m: 1 }}
                type="tel"
                name="phone"
                value={phoneNumber}
                variant="standard"
                placeholder="3862690"
                required
                fullWidth
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <InputLabel sx={{ m: 1 }}>BirthDay</InputLabel>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <FormControl variant='standard' sx={{ m: 1 }}>
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
              </FormControl>
              <FormControl variant='standard' sx={{ m: 1 }}>
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
              </FormControl>
              <FormControl variant='standard' sx={{ m: 1 }}>
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
              </FormControl>
            </div>
            {(selectedUser === null || selectedUser === undefined) && (
              <>
                <FormControl variant='standard' sx={{ m: 1 }}>
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
                </FormControl>
                <FormControl variant='standard' sx={{ m: 1 }}>
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
                </FormControl>
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
        {loading && <SuspenseLoader/>}
      </Dialog>
    </>
  );
}

export default AddUser;
