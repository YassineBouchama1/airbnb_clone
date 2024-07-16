import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserType = {
  fullName: string,
  avatar: string,
}



const AuthContext = createContext<{
  isAuthenticated: boolean,
  userInfo: UserType | null,
  checkAuthStatus: () => void,
}>({
  isAuthenticated: false,
  userInfo: null,
  checkAuthStatus: () => { },
});


export const useAuth = () => {
  return useContext(AuthContext);
};


const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<null|UserType>(null);


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

// fetch user info from local storage
return {fullName:"yassine",avatar:'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'}

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
