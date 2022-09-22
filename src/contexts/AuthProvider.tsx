import React, { useState } from 'react';

import AuthContext from './AuthContext';
import { AuthToken } from 'src/store/models/auth';
import { UserResponse } from 'src/store/models/user';

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = useState<AuthToken>(
    JSON.parse(localStorage.getItem('curAccount') || '{}')
  );
  const [user, setUser] = useState<UserResponse>();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('curAccount') !== null
  );

  const signIn = (newAuth: AuthToken, callback: VoidFunction) => {
    setAuthToken(newAuth);
    setIsAuthenticated(true);
    localStorage.setItem('curAccount', JSON.stringify(newAuth));
    callback();
  };

  const signOut = (callback: VoidFunction) => {
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('wedream-auth-token');
    localStorage.removeItem('curAccount');
    callback();
  };

  const value = { authToken, user, isAuthenticated, setUser, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
