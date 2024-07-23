import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '../AuthContext';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { GetReservations } from '../lib/reservationApi';

const Page = () => {

  const {isAuthenticated } = useAuth();

const router = useRouter()

// GetBookings
const query = useQuery({ queryKey: ['reservations'], queryFn: GetReservations })

  useEffect(() => {
    // If user is already authenticated, redirect to index page
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated]);

console.log(query.error)
  
  return (
    <View>
      <Text>{query.isLoading ? 'Loading': "fetched"}</Text>
      <Text>{query.isError && "error"}</Text>
    </View>
  );
};

export default Page;
