import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '../AuthContext';
import { useRouter } from 'expo-router';

const Page = () => {

  const {userInfo } = useAuth();

const router = useRouter()
  useEffect(() => {
    // If user is already authenticated, redirect to index page
    if (userInfo) {
      router.replace('/');
    }
  }, [userInfo]);

  return (
    <View>
      <Text>Explore</Text>
    </View>
  );
};

export default Page;
