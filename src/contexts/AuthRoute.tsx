import { useContext, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import AuthContext from './AuthContext';
import * as api from 'src/store/api-client'

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  useEffect(() => {
    api.getUserById(auth.authToken.userId, true, true, true, true).then(res => {
      auth.setUser(res);
    })
    .catch(err => {
      return <Navigate to="/signin" state={{ from: location }} replace />;
    });
  }, [])

  return children;
};

export default AuthRoute;
