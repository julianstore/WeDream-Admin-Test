import { Typography, Grid } from '@mui/material';

function PageHeader() {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Voice Request
          </Typography>
          <Typography variant="subtitle2">
            Admin, these are your voice requests
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
