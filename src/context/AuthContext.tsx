import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, expiresTime: number, userInfo: any) => void;
  logout: () => void;
  token: string | null;
  userInfo: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedToken && storedUserInfo) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const login = (token: string, expiresTime: number, userInfo: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('expiresTime', expiresTime.toString());
    setIsAuthenticated(true);
    setToken(token);
    setUserInfo(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expiresTime');
    setIsAuthenticated(false);
    setToken(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};