import React from 'react';

import { AuthToken } from 'src/store/models/auth';
import { UserResponse } from 'src/store/models/user';

interface AuthContextType {
  authToken: AuthToken;
  user: UserResponse;
  isAuthenticated: boolean;
  setUser: (user: UserResponse) => void;
  signIn: (authToken: AuthToken, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export default AuthContext;
