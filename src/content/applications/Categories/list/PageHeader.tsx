import { useState } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import AddCategory from '../AddCategory';
import { useAppDispatch } from 'src/store/hooks';
import { setSelectedCategory } from 'src/store/slices/categorySlice';

function PageHeader() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    dispatch(setSelectedCategory(null));
    setOpen(true);
  };

  return (
    <>
      <AddCategory
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />

      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Categories
          </Typography>
          <Typography variant="subtitle2">
            Admin, these are your dream categories
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={handleOpen}
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Add Category
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
