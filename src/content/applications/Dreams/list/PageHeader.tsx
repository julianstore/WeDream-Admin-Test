import { useState } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import AddDream from '../AddDream';
import { useAppDispatch } from 'src/store/hooks';
import { setSelectedDream } from 'src/store/slices/dreamSlice';

function PageHeader() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    dispatch(setSelectedDream(null));
    setOpen(true);
  };

  return (
    <>
      <AddDream
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />

      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Dreams
          </Typography>
          <Typography variant="subtitle2">
            Admin, these are your dreams
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={handleOpen}
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Add Dream
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
