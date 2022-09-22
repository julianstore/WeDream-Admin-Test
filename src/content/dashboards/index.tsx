import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';

import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import AccountBalance from './AccountBalance';
import Statistic from './Statistic';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>WeDream Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            {false && <AccountBalance />}
          </Grid>
          <Grid item lg={12} xs={12}>
            <Statistic />
          </Grid>
          <Grid item lg={4} xs={12}>
            {false && <AccountSecurity />}
          </Grid>
          <Grid item xs={12}>
            {false && <WatchList />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
