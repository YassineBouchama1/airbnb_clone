import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '../AuthContext';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { LoadReservations } from '../lib/reservationApi';
import { FlashList } from "@shopify/flash-list";
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import TripCard from '@/components/TripCard';


const Page = () => {

const {isAuthenticated } = useAuth();
const router = useRouter()

// GetBookings
const query = useQuery({ queryKey: ['reservations'], queryFn: LoadReservations })


  useEffect(() => {
    // If user is already authenticated, redirect to index page
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated]);


const NotFoundNFT = () => {
  return (
      <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Opps... ! </Text>
          <Text style={styles.notFoundText}> Not found the NFT</Text>
      </View>
  );
};

  




  return (
    <SafeAreaView style={styles.container}>
    {/* maping to display ntfcard  */}
    {!query.data?.length && !query.isLoading ?
        <NotFoundNFT /> :
        <FlashList
            data={query.data}
            renderItem={(trip :any) => <TripCard trip={trip} />}
            keyExtractor={(trip:any) => trip._id}
            estimatedItemSize={200}
        />}


</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 20,

}, notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.xLarge,
},
notFoundText: {
    color: COLORS.white,
    // fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge,
},
})

export default Page;
