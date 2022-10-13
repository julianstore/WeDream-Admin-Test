import { useState } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import AddUser from '../AddUser';
import { useAppDispatch } from 'src/store/hooks';
import { setSelectedUser } from 'src/store/slices/userSlice';

function PageHeader() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    dispatch(setSelectedUser(null));
    setOpen(true);
  };

  return (
    <>
      <AddUser
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />

      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Users
          </Typography>
          <Typography variant="subtitle2">
            Admin, these are your dream users
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={handleOpen}
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Add User
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
