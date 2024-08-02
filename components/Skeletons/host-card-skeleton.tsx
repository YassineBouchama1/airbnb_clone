import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const HostCardSkeleton = () => {
  return (
    <Animated.View
      style={styles.card}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <View style={styles.imageContainer}>
        <View style={styles.image} />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.title} />
        <View style={styles.description} />
        <View style={styles.infoRow}>
          <View style={styles.rating} />
          <View style={styles.price} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  imageContainer: {
    width: "100%",
    height: 250,
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

export default HostCardSkeleton;