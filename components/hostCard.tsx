import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from "react-native";

import * as FileSystem from "expo-file-system";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { useNavigation, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Carousel from "pinar";

import { HostType } from "@/constants/types";
import { COLORS } from "@/constants/theme";
import { Image as ExpoImage } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const shareListing = async (item: HostType) => {
  console.log("share btn");
  if (!item || !item.Host_code) {
    console.error("Host data or Host code is not available.");
    alert("Host data or Host code is not available.");
    return;
  }

  try {
    const imageUrl = item.image[0].secure_url;
    const imageUri = `${FileSystem.cacheDirectory}${item.Host_code}.jpg`;

    await FileSystem.downloadAsync(imageUrl, imageUri);

    await Share.share({
      title: `Check out this wonderful Host: ${item.nom}`,
      message: `Check out this wonderful Host: ${item.nom}\n\nLink: https://main.d11i2xf9qyhgyw.amplifyapp.com/host/${item.Host_code}`,
      url: imageUri,
    });

    console.log("Shared successfully");
  } catch (error: any) {
    console.error("Error sharing listing:", error.message);
    alert(`Error sharing: ${error.message}`);
  }
};

// render  Card Listing
const HostCard = ({
  item,
  isFav = false,
}: {
  item: HostType;
  isFav?: boolean;
}) => {
  const { t, i18n } = useTranslation(); // Get the current language

  const router = useRouter();

  const navigateToDetails = useCallback(
    (Host_code: string) => {
      router.push({
        pathname: "listing/details",
        params: { Host_code: Host_code },
      });
    },
    [router]
  );

  function shareBtn(item: HostType) {
    shareListing(item);
  }
  return (
    <Animated.View
      style={styles.card}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <Carousel
        style={styles.carousel}
        showsControls={false}
        dotStyle={styles.dotStyle}
        activeDotStyle={[styles.dotStyle, { backgroundColor: "white" }]}
      >
        {item.image.map((img: any) => (
          <TouchableOpacity
            key={item.Host_code}
            onPress={() =>
              router.push({
                pathname: "listing/details",
                params: { Host_code: item.Host_code },
              })
            }
            style={{ flex: 1 }}
          >
            <ExpoImage
              style={styles.image}
              source={{ uri: img.secure_url }}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
         
          </TouchableOpacity>
        ))}
      </Carousel>
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() => shareListing(item)}
      >
        <AntDesign name="sharealt" size={16} color={"#000"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToDetails(item.Host_code)}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.nom}</Text>
          <Text style={styles.description}>{item.About}</Text>
          <View style={styles.infoRow}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="star" size={16} style={{ marginTop: 2.5 }} />
              <Text style={styles.rating}>{item.Rating}</Text>
            </View>
            <Text style={styles.price}>
              {t("Price")}: ${item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
  carousel: {
    width: "100%",
    height: 250,
  },
  dotStyle: {
    width: 7,
    height: 7,
    backgroundColor: "silver",
    marginHorizontal: 3,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  roundButton: {
    position: "absolute",
    right: 6,
    top: 8,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.primary,
    padding: 8,
    elevation: 2,
    // borderRadius: 18,
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rating: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  noListingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
  },
  noListingsImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 20,
  },
  noListingsText: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: "center",
  },
  hostsSum: {
    textAlign: "center",
    fontFamily: "mon-b",
    fontSize: 14,
  },
});

export default HostCard;
