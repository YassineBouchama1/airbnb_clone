import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  Button,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { useTranslation } from "react-i18next";
import Carousel from "pinar";
import hostJson from "@/constants/hosts.json";
import { HostType } from "@/constants/types";
import { COLORS } from "@/constants/theme";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateReservation } from "../lib/reservationApi";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import HostCarousel from "@/components/HostDetails/HostCarousel";
import HostInfo from "@/components/HostDetails/HostInfo";
import HostAmenities from "@/components/HostDetails/HostAmenities";
import { LoadOneHostels } from "../lib/hostelAPi";

// the type for the reservation data
interface ReservationData {
  Host_code: string;
  startDate: dayjs.Dayjs | string;
  endDate: dayjs.Dayjs | string;
}

const Page = () => {
  const params = useLocalSearchParams();
  const Host_code = String(params.Host_code || "");

  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [totalDays, setTotalDays] = useState(1);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | string>(dayjs());
  const [startDate, setStartDate] = useState<dayjs.Dayjs | string>(dayjs());

  const queryClient = useQueryClient();




   // Fetch hostels using Tanstack Query with dependency on region for smooth updates
   const { data , isLoading,isError } = useQuery({
    queryKey: ["hostelDetails", Host_code,i18n.language], 
    queryFn: () =>
      LoadOneHostels(
        Host_code,
      
      ),
    enabled: !!Host_code, // Only fetch when region is available
    staleTime: 1000 * 60 * 5, // Allow cached data for 5 minutes to avoid excessive fetches
  });


 
  // Mutation to add a new reservation
  const mutation = useMutation({
    mutationFn: async (data: ReservationData) => await CreateReservation(data),
    onSuccess: () => {
      // after the reservation booked refresh list of trips in page trips
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      Alert.alert(
        "Reservation",
        "Successfully Booked",
        [{ text: "OK", onPress: () => router.push("/trips") }],
        { cancelable: false }
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // fun for excut the queries
  const handleAddReservation = () => {
    // validation data

    console.log(startDate, endDate);
    mutation.mutate({ Host_code, startDate, endDate });
  };

  // While data is fetching, display loader
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }


  // While data is fetching, display loader
  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error </Text>
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>
   
      <HostCarousel host={data} />
      <View style={styles.contentContainer}>
        <HostInfo host={data} />
        <HostAmenities host={data} />

        <View style={styles.container}>
          <DateTimePicker
            mode="range"
            startDate={startDate}
            endDate={endDate}
            onChange={(dates) => {
              setStartDate(dates.startDate as dayjs.Dayjs);
              setEndDate(dates.endDate as dayjs.Dayjs);
              // Calculate the total number of days selected
              const totalDays = dayjs(dates.endDate).diff(
                dayjs(dates.startDate),
                "days"
              );
              
              // Update the price based on the total number of days selected
              setTotalDays(totalDays);
            }}
            dates={["2024-07-09", "2024-07-19"]}
            calendarTextStyle={styles.calendarTextStyle}
            selectedItemColor={COLORS.primary}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.price}>${data?.price * totalDays}</Text>
            <Text style={{ margin: 4 }}>night</Text>
          </View>
          <TouchableOpacity
            disabled={mutation.isPending}
            onPress={() => handleAddReservation()}
            style={{
              ...styles.addButton,
              opacity: mutation.isPending ? 0.4 : 1,
            }}
            >
            <Text style={styles.addButtonText}>
              {mutation.isPending ? "Booking" : t("Book")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
     
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  calendarTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  selectedItemColor: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  carousel: {
    width: "100%",
    height: 450,
  },
  celenderPicker: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  contentContainer: {
    paddingTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    margin: 20,
    marginTop: 0,
    paddingTop: 30,
  },
  price: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    padding: 10,
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    margin: 20,
  },
});

export default Page;
