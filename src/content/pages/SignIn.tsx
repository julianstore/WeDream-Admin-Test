import { useCallback, useContext, useState } from 'react';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Box, styled } from '@mui/material';

import * as api from 'src/store/api-client';
import AuthContext from '../../contexts/AuthContext';
import SuspenseLoader from 'src/components/SuspenseLoader';

if (typeof window !== 'undefined') {
  injectStyle();
}

const SignInWrapper = styled(Box)(
  ({ theme }) => `
    margin-top: ${theme.spacing(30)};
  `
);

const SignIn = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = useCallback(async () => {
    const LoginSourceAdmin = parseInt(process.env.REACT_APP_ADMIN_SOURCE) || 3;
    try {
      setLoading(true);
      const res = await api.signIn(userLogin, password, LoginSourceAdmin);
      if (res.status === 200) {
        localStorage.setItem('wedream-auth-token', res.data.authToken.accessToken);
        authContext.signIn(res.data.authToken, () => {
          navigate('/dashboard');
        });
      } else {
        setLoading(false);
        toast.warning(res.data.ERR_CODE);
      }
    } catch(ex) {
      setLoading(false);
    }
  }, [userLogin, password, loading]);

  return (
    <>
      {loading && <SuspenseLoader/>}
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <SignInWrapper>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={6} alignItems="center" justifyItems={'center'}>
              <Card>
                <CardHeader title="Sign In" />
                <Divider />
                <CardContent>
                  <Grid item xs={8} style={{ margin: '10px auto' }}>
                    <TextField
                      id="standard-read-only-input"
                      label="User"
                      type="text"
                      value={userLogin}
                      variant="standard"
                      fullWidth
                      onChange={(e) => {
                        setUserLogin(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} style={{ margin: '10px auto' }}>
                    <TextField
                      id="standard-password-input"
                      label="Password"
                      type="password"
                      value={password}
                      variant="standard"
                      fullWidth
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ marginTop: '30px', textAlign: 'center' }}
                  >
                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      onClick={handleSignIn}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </SignInWrapper>
      <ToastContainer
        position="top-right"
        newestOnTop
        style={{ marginTop: 100, zIndex: '99999 !important' }}
      />
    </>
  );
};
export default SignIn;
