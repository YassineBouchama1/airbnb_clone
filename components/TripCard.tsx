import { useNavigation } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "@/constants/theme";

const TripCard = ({ trip }: any) => {

    console.log(trip.item.HotelId)
  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <View style={{ marginVertical: SIZES.medium }}>
          <Text style={styles.title}>{trip.item._id}</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.medium,
    marginBottom: SIZES.xLarge,
    marginVertical: SIZES.small - 5,
    marginHorizontal: 14,
    padding: 12,
    backgroundColor: COLORS.bg,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },

  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },

});
