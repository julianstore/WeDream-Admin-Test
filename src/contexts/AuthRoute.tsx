import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from './AuthContext';
import * as api from 'src/store/api-client'

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/signin');
    } else {
      api.getUserById(auth.authToken.userId, true, true, true, true).then(res => {
        auth.setUser(res);
      })
      .catch(err => {
        navigate('/signin');
      });
    }
    return () => {
      auth.setUser(null);
    }
  }, [])

  return children;
};

export default AuthRoute;
