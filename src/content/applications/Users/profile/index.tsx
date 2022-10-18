import { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';
import Feed from './Feed';
import ProfileInfo from './ProfileInfo';
import MyCards from './MyCards';
import Addresses from './Addresses';
import AuthContext from 'src/contexts/AuthContext';

function ManagementUserProfile() {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({
    savedCards: 7,
    name: 'Catherine Pike',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description: "",
    jobtitle: "",
    email: "",
  });

  useEffect(() => {
    setUser({
      ...user,
      name: authContext?.user?.user?.displayName || '',
      avatar: authContext?.user?.user?.imageUrl || '',
      email: authContext?.user?.user?.profile?.email || '',
      jobtitle: authContext?.user?.user?.isAdmin ? 'Administrator' : 'User',
    });
  }, [authContext]);

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          {/* <Grid item xs={12} md={8}>
            <Feed />
          </Grid> */}
          <Grid item xs={12} md={12}>
            <ProfileInfo />
          </Grid>
          {/* <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
