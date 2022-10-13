import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';

import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import VoiceRequestList from './VoiceRequestList';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

function ApplicationsVoiceRequests() {
  return (
    <>
      <Helmet>
        <title>Voice Requests - Applications</title>
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
          spacing={3}
        >
          <Grid item xs={12}>
            <VoiceRequestList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsVoiceRequests;
