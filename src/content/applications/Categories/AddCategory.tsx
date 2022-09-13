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
import { getCategories } from 'src/store/slices/categorySlice';

function AddCategory(props) {
  const { onClose, selectedCategory, open } = props;

  if (typeof window !== 'undefined') {
    injectStyle();
  }

  const today = new Date();

  const dispatch = useAppDispatch();
  const [categoryId, setCategoryId] = useState('');
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedCategory !== null && selectedCategory !== undefined) {
      setCategoryId(selectedCategory.categoryId);
      setIcon(selectedCategory.icon);
      setName(selectedCategory.name);
    }
  }, [selectedCategory]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    if (selectedCategory !== null && selectedCategory !== undefined) {
      await api
        .updateCategory(selectedCategory.categoryId, icon, name)
        .then((res) => {
          if (res.status === 200) {
            toast.success('Category is updated');
            dispatch(getCategories());
            handleClose();
          } else {
            toast.warning(res.data.ERR_CODE);
          }
        });
    } else {
      await api.addCategory(categoryId, icon, name).then((res) => {
        if (res.status === 200) {
          toast.success('New Category is created');
          dispatch(getCategories());
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
      </Dialog>
    </>
  );
}

export default AddCategory;
