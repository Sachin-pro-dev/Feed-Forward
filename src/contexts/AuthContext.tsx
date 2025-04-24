
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  email: string;
  name: string;
  userType?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
  }>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Check for existing auth on mount
    const storedAuth = localStorage.getItem('feedforward_auth');
    
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuthState({
          isAuthenticated: parsedAuth.isAuthenticated,
          user: parsedAuth.user,
          loading: false,
        });
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('feedforward_auth');
        setAuthState({ isAuthenticated: false, user: null, loading: false });
      }
    } else {
      setAuthState({ isAuthenticated: false, user: null, loading: false });
    }
  }, []);

  const login = (user: User) => {
    const authData = { isAuthenticated: true, user };
    localStorage.setItem('feedforward_auth', JSON.stringify(authData));
    setAuthState({ ...authData, loading: false });
  };

  const logout = () => {
    localStorage.removeItem('feedforward_auth');
    setAuthState({ isAuthenticated: false, user: null, loading: false });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        login,
        logout,
        loading: authState.loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
