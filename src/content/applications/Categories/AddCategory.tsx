import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { injectStyle } from 'react-toastify/dist/inject-style';

import * as api from '../../../store/api-client';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { _pagination, _selectedCategory, setPagination } from 'src/store/slices/categorySlice';

function AddCategory(props) {
  const { onClose, open } = props;
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(_pagination);
  const selectedCategory = useAppSelector(_selectedCategory);

  if (typeof window !== 'undefined') {
    injectStyle();
  }

  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      setCategoryId(selectedCategory.categoryId);
      setIcon(selectedCategory.icon);
      setName(selectedCategory.name);
    } else {
      setCategoryId('');
      setIcon('');
      setName('');
    }
  }, [selectedCategory]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (selectedCategory) {
        const res = await api.updateCategory(selectedCategory.categoryId, icon, name);
        if (res.status === 200) {
          toast.success('Category is updated');
          dispatch(setPagination({ page: pagination.page, limit: pagination.limit }));
        } else {
          toast.warning(res.data.ERR_CODE);
        }
      } else {
        const res = await api.addCategory(categoryId, icon, name);
        if (res.status === 200) {
          toast.success('New Category is created');
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
        maxWidth={'xs'}
      >
        <DialogTitle>
          {' '}
          {selectedCategory === null || selectedCategory === undefined
            ? `Add Category`
            : `Update Category`}{' '}
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
              label="Category ID"
              type="text"
              name="category_id"
              value={categoryId}
              variant="standard"
              required
              fullWidth
              onChange={(e) => setCategoryId(e.target.value)}
            />
            <TextField
              label="Icon"
              type="text"
              name="icon"
              value={icon}
              variant="standard"
              required
              fullWidth
              onChange={(e) => setIcon(e.target.value)}
            />
            <TextField
              label="Name"
              type="text"
              name="name"
              value={name}
              variant="standard"
              required
              fullWidth
              onChange={(e) => setName(e.target.value)}
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
        {loading && <SuspenseLoader/>}
      </Dialog>
    </>
  );
}

export default AddCategory;
