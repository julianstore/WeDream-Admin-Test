import { useState, useEffect, useCallback } from 'react';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import { Box, TextField, FormControl, FormLabel } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import * as api from '../../../store/api-client';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { _pagination, _selectedDream, setPagination } from 'src/store/slices/dreamSlice';
import { _categoryList, setTotalCount as SetCategoryTotalCount, setPagination as setCategoryPagination, setCategoryList } from 'src/store/slices/categorySlice';
import { _userList, setTotalCount as setUserTotalCount, setPagination as setUserPagination, setUserList } from 'src/store/slices/userSlice';

if (typeof window !== 'undefined') {
  injectStyle();
}

function AddDream(props) {
  const { onClose, open } = props;
  const dispatch = useAppDispatch();
  const users = useAppSelector(_userList);
  const pagination = useAppSelector(_pagination);
  const categories = useAppSelector(_categoryList);
  const selectedDream = useAppSelector(_selectedDream);

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [background, setBackground] = useState(1);
  const [owner, setOwner] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [auctionId, setAuctionId] = useState(1001);

  const [isAuction, setIsAuction] = useState(false);
  const [hideFromLists, setHideFromLists] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isFeatured, setIsFeatured] = useState(false);
  const [isAllowAvatarAccessories, setIsAllowAvatarAccessories] = useState(false);
  const [isAllowGadgets, setIsAllowGadgets] = useState(false);
  const [isAllowDreamEditing, setIsAllowDreamEditing] = useState(false);
  const [isAllowBroadcasting, setIsAllowBroadcasting] = useState(false);

  useEffect(() => {
    if (selectedDream) {
      setCategory(selectedDream.categoryId);
      setBackground(selectedDream.background);
      setOwner(selectedDream.ownerId);
      setTitle(selectedDream.title);
      setDescription(selectedDream.description);
      setAuctionId(selectedDream.auctionId);
      setIsAuction(selectedDream.isAuction);
      setHideFromLists(selectedDream.hideFromLists);
      setIsPrivate(selectedDream.isPrivate);
      setTags(selectedDream.tags || []);
      setStartTime(new Date(selectedDream.startTime));
      setEndTime(selectedDream.endTime ? new Date(selectedDream.endTime) : null);
      setIsFeatured(selectedDream.isFeatured);
      setIsAllowAvatarAccessories(selectedDream.allowAvatarAccessories);
      setIsAllowGadgets(selectedDream.allowGadgets);
      setIsAllowDreamEditing(selectedDream.allowDreamEditing);
      setIsAllowBroadcasting(selectedDream.allowBroadcasting);
    } else {
      setCategory('');
      setBackground(1);
      setOwner('');
      setTitle('');
      setDescription('');
      setAuctionId(1001);
      setIsAuction(false);
      setHideFromLists(false);
      setIsPrivate(false);
      setTags([]);
      setStartTime(new Date());
      setEndTime(new Date());
      setIsFeatured(false);
      setIsAllowAvatarAccessories(false);
      setIsAllowGadgets(false);
      setIsAllowDreamEditing(false);
      setIsAllowBroadcasting(false);
    }
  }, [selectedDream]);

  const getCategoryList = useCallback(async (page, limit) => {
    try {
      setLoading(true);
      const categoryRes = await api.getDreamCategoryList(page, limit);
      dispatch(setCategoryList(categoryRes.categories));
      dispatch(SetCategoryTotalCount(parseInt(categoryRes.totalCount || '0')));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserList = useCallback(async (page, limit) => {
    try {
      setLoading(true);
      const userRes = await api.getAllUsers(page, limit);
      dispatch(setUserList(userRes.users));
      dispatch(setUserTotalCount(parseInt(userRes.totalCount || '0')));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const newPagination = { page: 1, limit: 99999 };
    dispatch(setCategoryPagination(newPagination));
    dispatch(setUserPagination(newPagination));
    getCategoryList(newPagination.page, newPagination.limit);
    getUserList(newPagination.page, newPagination.limit);
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (selectedDream) {
        const res = await api.updateDream(selectedDream.dreamId, parseInt(category), background, owner, title, description, auctionId, isAuction, hideFromLists, isPrivate, isFeatured, isAllowAvatarAccessories, isAllowGadgets, isAllowDreamEditing, isAllowBroadcasting, startTime.toISOString(), endTime ? endTime.toISOString() : '', tags);
        if (res.status === 200) {
          toast.success('Dream is updated');
          dispatch(setPagination({ page: pagination.page, limit: pagination.limit }));
        } else {
          toast.warning(res.data.ERR_CODE);
        }
      } else {
        const res = await api.addDream(parseInt(category), background, owner, title, description, auctionId, isAuction, hideFromLists, isPrivate, isFeatured, isAllowAvatarAccessories, isAllowGadgets, isAllowDreamEditing, isAllowBroadcasting, startTime.toISOString(), endTime ? endTime.toISOString() : '', tags);
        if (res.status === 200) {
          toast.success('New Dream is created');
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
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth={true}
        maxWidth={'md'}
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
            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
              <FormControl variant='standard' sx={{ m: 1 }}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Please select dream category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((item) => (
                    <MenuItem key={item.categoryId} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              <FormControl variant='standard' sx={{ m: 1 }}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Please select owner"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                >
                  {users.map((user) => (
                    <MenuItem key={user.profile.userId} value={user.profile.userId}>
                      {user.displayName}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
              <FormControl variant='standard' sx={{ m: 1 }}>
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
              </FormControl>

              <FormControl variant='standard' sx={{ m: 1 }}>
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
              </FormControl>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
              <FormControl variant='standard' sx={{ m: 1 }}>
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
              </FormControl>

              <FormControl variant='standard' sx={{ m: 1 }}>
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
              </FormControl>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '25% 25% 25% 25%' }}>
              <FormControl variant='standard' sx={{ m: 1 }}>
                <FormLabel>Featured</FormLabel>
                <Switch
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    name="isFeatured"
                  />
              </FormControl>

              <FormControl variant='standard' sx={{ m: 1 }}>
                <FormLabel>
                  Allow Avatar Accessories
                </FormLabel>
                <Switch
                  checked={isAllowAvatarAccessories}
                  onChange={(e) => setIsAllowAvatarAccessories(e.target.checked)}
                  name="isAllowAvatarAccessories"
                />
              </FormControl>

              <FormControl variant='standard' sx={{ m: 1 }}>
                <FormLabel>
                  Allow Gadgets
                </FormLabel>
                <Switch
                  checked={isAllowGadgets}
                  onChange={(e) => setIsAllowGadgets(e.target.checked)}
                  name="isAllowGadgets"
                />
              </FormControl>

              <FormControl variant='standard' sx={{ m: 1 }}>
                <FormLabel>
                  Allow Dream Editing
                </FormLabel>
                <Switch
                  checked={isAllowDreamEditing}
                  onChange={(e) => setIsAllowDreamEditing(e.target.checked)}
                  name="isAllowDreamEditing"
                />
              </FormControl>

              <FormControl variant='standard' sx={{ m: 1 }}>
                <FormLabel>
                  Allow Broadcasting
                </FormLabel>
                <Switch
                  checked={isAllowBroadcasting}
                  onChange={(e) => setIsAllowBroadcasting(e.target.checked)}
                  name="isAllowBroadcasting"
                />
              </FormControl>

              <FormControl variant='standard' sx={{ m: 1 }}>
                <FormLabel>
                  Allow Auction
                </FormLabel>
                <Switch
                  checked={isAuction}
                  onChange={(e) => setIsAuction(e.target.checked)}
                  name="isAuction"
                />
              </FormControl>

              <FormControl variant='standard' sx={{ m: 1 }}>
                <FormLabel>
                  Allow Hide From Lists
                </FormLabel>
                <Switch
                  checked={hideFromLists}
                  onChange={(e) => setHideFromLists(e.target.checked)}
                  name="hideFromLists"
                />
              </FormControl>

              <FormControl variant='standard' sx={{ m: 1 }}>
                <FormLabel>
                  Allow Private
                </FormLabel>
                <Switch
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  name="isPrivate"
                />
              </FormControl>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
              <FormControl variant='standard' sx={{ m: 1 }}>
                <TextField
                  label="Tag"
                  type="text"
                  name="tag"
                  variant="standard"
                  required
                  fullWidth
                  value={tag}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setTags([...tags, tag]);
                      setTag('');
                    }
                  }}
                  onChange={(e) => setTag(e.target.value)}
                />
              </FormControl>

              <FormControl variant='standard' sx={{ m: 1 }}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Tag List"
                >
                  {tags.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
              <FormControl variant='standard' sx={{ m: 1 }}>
                <DateTimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={(newValue: Date | null) => {
                    setStartTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
              <FormControl variant='standard' sx={{ m: 1 }}>
                <DateTimePicker
                  label="End Time"
                  value={endTime}
                  onChange={(newValue: Date | null) => setEndTime(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </div>
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

export default AddDream;
