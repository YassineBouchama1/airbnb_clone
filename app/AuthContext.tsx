import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  isAuthenticated: false,
  userInfo: null,
  checkAuthStatus: () => { },
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);


  // chekc if token is not provided
  const getUserAuthStatus = async () => {
    const token = await AsyncStorage.getItem('access_token');
    return token !== null;
  };


  // get user info from local storage
  const getUserInfo = async () => {
    const accessToken = await AsyncStorage.getItem('access_token');
    if (!accessToken) return null;

    const userCode = await AsyncStorage.getItem('user_code');

    if (!userCode) return null;

    try {
      const response = await fetch(`https://azhzx0jphc.execute-api.eu-north-1.amazonaws.com/dev/users/${userCode}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  };


  // check if user auth
  const checkAuthStatus = async () => {
    // 1 check if user is logged in
    const isLoggedIn = await getUserAuthStatus();
    setIsAuthenticated(isLoggedIn);

    // 2 if user is logged in, fetch their info and update state
    if (isLoggedIn) {
      const user = await getUserInfo();
      setUserInfo(user); 
    } else {
      setUserInfo(null);
    }
  };


  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
