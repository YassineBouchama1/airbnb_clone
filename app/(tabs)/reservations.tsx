import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { LoadReservations } from "../lib/reservationApi";
import { FlashList } from "@shopify/flash-list";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import TripCard from "@/components/TripCard";

const Page = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["reservations", isAuthenticated],
    queryFn: LoadReservations,
    enabled: !!isAuthenticated, // fetch only if isAuthenticated
  });
  const [refreshing, setRefreshing] = useState(false);

  const NotFoundNFT = () => {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Opps... !</Text>
        <Text style={styles.notFoundText}>Not found the Reservations</Text>
      </View>
    );
  };

  // when user slid down the data refreshed
  const onRefreshTrips = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // if there is a error fetch display alert
  if (isError) {
    Alert.alert(
      "Failed to fetch",
      error.message,
      [
        { text: "ReLogin", onPress: () => router.replace("/profile") },
        { text: "Try Again", onPress: async () => await refetch() },
        { text: "close"},
      ],
      { cancelable: false }
    );
    return (
      <View style={styles.container}>
        <Text>Error fetching reservations: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {(isError || data?.error) && (
        <View>
          <Text>error</Text>
        </View>
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : data?.length > 0 ? (
        <FlashList
          data={data}
          renderItem={(trip: any) => <TripCard trip={trip} />}
          keyExtractor={(trip: any) => trip._id}
          estimatedItemSize={200}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshTrips}
            />
          }
        />
      ) : (
        <NotFoundNFT />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 20,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.xLarge,
  },
  notFoundText: {
    color: COLORS.black,
    // fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge,
  },
});

export default Page;
