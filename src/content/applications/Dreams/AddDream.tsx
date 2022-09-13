import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer, toast } from 'react-toastify';
import { Box, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { _categoryList } from 'src/store/slices/categorySlice';
import { _userList } from 'src/store/slices/userSlice';
import Switch from '@mui/material/Switch';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import * as api from '../../../store/api-client';
import { getDreams } from 'src/store/slices/dreamSlice';

if (typeof window !== 'undefined') {
  injectStyle();
}

function AddDream(props) {
  const { onClose, selectedDream, open } = props;

  const today = new Date();

  const dispatch = useAppDispatch();
  const categories = useAppSelector(_categoryList);
  const users = useAppSelector(_userList);
  const [category, setCategory] = useState('');
  const [background, setBackground] = useState(1);
  const [owner, setOwner] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [auctionId, setAuctionId] = useState(1001);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isFeatured, setIsFeatured] = useState(false);
  const [isAllowAvatarAccessories, setIsAllowAvatarAccessories] = useState(
    false
  );
  const [isAllowGadgets, setIsAllowGadgets] = useState(false);
  const [isAllowDreamEditing, setIsAllowDreamEditing] = useState(false);
  const [isAllowBroadcasting, setIsAllowBroadcasting] = useState(false);
  useEffect(() => {
    if (selectedDream !== null && selectedDream !== undefined) {
      setCategory(selectedDream.categoryId);
      setBackground(selectedDream.background);
      setOwner(selectedDream.ownerId);
      setTitle(selectedDream.title);
      setDescription(selectedDream.description);
      setAuctionId(selectedDream.auctionId);
      setStartTime(new Date(selectedDream.startTime));
      setEndTime(
        selectedDream.endTime ? new Date(selectedDream.endTime) : null
      );
      setIsFeatured(selectedDream.isFeatured);
      setIsAllowAvatarAccessories(selectedDream.allowAvatarAccessories);
      setIsAllowGadgets(selectedDream.allowGadgets);
      setIsAllowDreamEditing(selectedDream.allowDreamEditing);
      setIsAllowBroadcasting(selectedDream.allowBroadcasting);
    }
  }, [selectedDream]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    console.log(endTime);
    if (selectedDream !== null && selectedDream !== undefined) {
      await api
        .updateDream(
          selectedDream.dreamId,
          category,
          background,
          owner,
          title,
          description,
          auctionId,
          isFeatured,
          isAllowAvatarAccessories,
          isAllowGadgets,
          isAllowDreamEditing,
          isAllowBroadcasting,
          startTime.toISOString(),
          endTime ? endTime.toISOString() : ''
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success('Dream is updated');
            dispatch(getDreams());
            handleClose();
          } else {
            toast.warning(res.data.ERR_CODE);
          }
        });
    } else {
      await api
        .addDream(
          category,
          background,
          owner,
          title,
          description,
          auctionId,
          isFeatured,
          isAllowAvatarAccessories,
          isAllowGadgets,
          isAllowDreamEditing,
          isAllowBroadcasting,
          startTime.toISOString(),
          endTime ? endTime.toISOString() : ''
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success('New Dream is created');
            dispatch(getDreams());
            handleClose();
          } else {
            toast.warning(res.data.ERR_CODE);
          }
        });
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
          {selectedDream === null || selectedDream === undefined
            ? `Add Dream`
            : `Update Dream`}{' '}
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
              id="outlined-select-currency"
              select
              label="Select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              helperText="Please select dream category"
            >
              {categories.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              helperText="Please select owner"
            >
              {users.map((user) => (
                <MenuItem key={user.profile.userId} value={user.profile.userId}>
                  {user.displayName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Background"
              type="number"
              name="background"
              value={background}
              variant="standard"
              required
              fullWidth
              onChange={(e) => setBackground(parseInt(e.target.value))}
            />
            <TextField
              label="Title"
              type="text"
              name="title"
              value={title}
              variant="standard"
              required
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Description"
              type="text"
              name="description"
              value={description}
              variant="standard"
              required
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Auction ID"
              type="number"
              name="auctionId"
              value={auctionId}
              variant="standard"
              required
              fullWidth
              onChange={(e) => setAuctionId(parseInt(e.target.value))}
            />
            <div>
              {`Featured`}
              <Switch
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                name="isFeatured"
              />
              {`Allow Avatar Accessories`}
              <Switch
                checked={isAllowAvatarAccessories}
                onChange={(e) => setIsAllowAvatarAccessories(e.target.checked)}
                name="isAllowAvatarAccessories"
              />
            </div>
            <div>
              {`Allow Gadgets`}
              <Switch
                checked={isAllowGadgets}
                onChange={(e) => setIsAllowGadgets(e.target.checked)}
                name="isAllowGadgets"
              />
              {`Allow Dream Editing`}
              <Switch
                checked={isAllowDreamEditing}
                onChange={(e) => setIsAllowDreamEditing(e.target.checked)}
                name="isAllowDreamEditing"
              />
            </div>
            <div>
              {`Allow Broadcasting`}
              <Switch
                checked={isAllowBroadcasting}
                onChange={(e) => setIsAllowBroadcasting(e.target.checked)}
                name="isAllowBroadcasting"
              />
            </div>
            <DateTimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue: Date | null) => {
                setStartTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="End Time"
              value={endTime}
              onChange={(newValue: Date | null) => setEndTime(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
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

export default AddDream;
