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

  const signIn = (newAccount: any, callback: VoidFunction) => {
    setAccount(newAccount);
    setIsAuthenticated(true);
    localStorage.setItem('curAccount', JSON.stringify(newAccount));
    callback();
  };

  const signOut = (callback: VoidFunction) => {
    setAccount(null);
    setIsAuthenticated(false);
    localStorage.removeItem('wedream-auth-token');
    localStorage.removeItem('curAccount');
    callback();
  };

  const value = { account, isAuthenticated, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
