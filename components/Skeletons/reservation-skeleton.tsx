import { COLORS, SIZES } from "@/constants/theme";
import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const ReservationSkeleton = () => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <View style={styles.imageContainer}>
        <View style={styles.image} />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.title} />
        <View style={styles.description} />
      
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: SIZES.medium,
        marginBottom: SIZES.xLarge,
        marginVertical: SIZES.small - 5,
        marginHorizontal: 14,
        flexDirection: "row",
        gap: SIZES.medium,
        alignContent:'flex-start',
        justifyContent: "flex-start",
        padding: 12,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
      },
  imageContainer: {
    borderRadius:10,
    width:'25%',
    height:100,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E0E0E0",
  },
  cardContent: {
    padding: 15,
  },
  title: {
    height: 24,
    width: "70%",
    backgroundColor: "#E0E0E0",
    marginBottom: 10,
    borderRadius: 4,
  },
  description: {
    height: 16,
    width: "100%",
    backgroundColor: "#E0E0E0",
    marginBottom: 15,
    borderRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rating: {
    height: 16,
    width: "20%",
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  price: {
    height: 16,
    width: "30%",
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
});

export default ReservationSkeleton;