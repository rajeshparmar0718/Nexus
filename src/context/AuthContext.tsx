'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';

interface AuthContextType {
  user: any;
  isSignedIn: boolean;
  isLoaded: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [authState, setAuthState] = useState<{ user: any; isSignedIn: boolean; isLoaded: boolean }>({
    user: null,
    isSignedIn: false,
    isLoaded: false,
  });

  useEffect(() => {
    if (isLoaded) {
      setAuthState({
        user: user || null,
        isSignedIn: !!isSignedIn,
        isLoaded: isLoaded,
      });
    }
  }, [isLoaded, isSignedIn, user]);

  const logout = () => {
    setAuthState({ user: null, isSignedIn: false, isLoaded: true });
    // Add any additional logout logic here if necessary
  };

  return (
    <AuthContext.Provider value={{ ...authState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log(context); 
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
