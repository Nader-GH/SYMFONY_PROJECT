import { createContext } from 'react';
import { AuthContextType } from '../types';

const defaultValue: AuthContextType = {
  isLoggedIn: false,
  isAdmin: false,
  login: () => false,
  logout: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export default AuthContext;
