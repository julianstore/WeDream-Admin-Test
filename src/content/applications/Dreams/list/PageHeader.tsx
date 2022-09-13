import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AddDream from '../AddDream';
import { useState } from 'react';

function PageHeader() {
  const user = {
    name: 'Admin',
    avatar: '/static/images/avatars/1.jpg'
  };

  const [open, setOpen] = useState(false);

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
            {user.name}, these are your dreams
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              setOpen(true);
            }}
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
