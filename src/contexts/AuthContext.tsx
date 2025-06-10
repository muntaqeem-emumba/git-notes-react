import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import api from '../services/api';
import type { User } from '../interfaces/gist';

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  userData: User | null;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    // Optionally persist auth state in localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken)
      login(storedToken);
    };
  }, []);

  const login = async (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    const response = await api.get('/user');
    setUserData(response.data as User);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    token,
    isLoggedIn: !!token,
    userData,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
