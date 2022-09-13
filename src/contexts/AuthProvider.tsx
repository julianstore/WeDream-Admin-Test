import React, { useState, useCallback } from 'react';
import AuthContext from './AuthContext';

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [account, setAccount] = useState<any>(
    JSON.parse(localStorage.getItem('curAccount') || '{}')
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('curAccount') !== null
  );

  const signin = (newAccount: any, callback: VoidFunction) => {
    setAccount(newAccount);
    setIsAuthenticated(true);
    localStorage.setItem('curAccount', JSON.stringify(newAccount));
    callback();
  };

  const signout = (callback: VoidFunction) => {
    setAccount(null);
    setIsAuthenticated(false);
    localStorage.removeItem('wedream-auth-token');
    localStorage.removeItem('curAccount');
    callback();
  };

  const value = { account, isAuthenticated, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
