import { useContext, useEffect, useState } from 'react';
import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AuthContext from 'src/contexts/AuthContext';

function PageHeader() {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({ name: '', avatar: '' });
  const theme = useTheme();

  useEffect(() => {
    setUser({
      name: authContext?.user?.user?.displayName || '',
      avatar: authContext?.user?.user?.imageUrl || '/static/images/avatars/6.png',
    });
  }, [authContext])

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          Today is a good day to enjoy with WeDream!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
