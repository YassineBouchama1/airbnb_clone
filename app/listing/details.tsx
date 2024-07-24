import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Share,
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


const Page = () => {
  const params = useLocalSearchParams();
  const { Host_code } = params;

  const [host, setHost] = useState<HostType>();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);


  
  useEffect(() => {
    // fetch detail information host
    const fetchHostDetails = async () => {
      const selectedHost = hostJson.find(
        (host) => host.Host_code === Host_code
      );
      // await new Promise(resolve => setTimeout(resolve, 5000));
      setHost(selectedHost);

    };

    if (Host_code) {
      fetchHostDetails();
    }
  }, [Host_code, i18n.language]);



// while data fetching display loader
if (!host) {
  return (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }



  // const { isLoading: isLoadingQuery, isError, data, error } = useQuery({
  //   queryKey: ['reservations'],
  //   queryFn:  async()=> await LoadReservations()
  // })





  const renderAmenity = (amenity: any, index: number) => {
    const amenityName = amenity?.name || t("Unknown Amenity");
    const amenityIcon = amenity?.svg;

    // Modify the SVG string to remove 'fill: currentcolor;'
    const svgXmlData = amenityIcon?.replace("fill: currentcolor;", "");

    return (
      <View key={amenity.amenity_code} style={styles.amenity}>
        <SvgXml xml={svgXmlData} width={24} height={24} />
        <Text style={styles.amenityText}>{amenityName}</Text>
      </View>
    );
  };

  const shareListing = async () => {
    if (!host || !host.Host_code) {
      console.error("Host data or Host code is not available.");
      alert("Host data or Host code is not available.");
      return;
    }

    try {
      const imageUrl = host.image[0].secure_url;
      const imageUri = `${FileSystem.cacheDirectory}${host.Host_code}.jpg`;

      await FileSystem.downloadAsync(imageUrl, imageUri);

      await Share.share({
        message: `Check out this wonderful Host: ${host.nom}\n\nLink: https://main.d11i2xf9qyhgyw.amplifyapp.com/host/${host.Host_code}`,
        url: imageUri,
      });

      console.log("Shared successfully");
    } catch (error: any) {
      console.error("Error sharing listing:", error.message);
      alert(`Error sharing: ${error.message}`);
    }
  };


  // const handleBook = async () => {
  //   setIsLoading(true);

  //   // get items
  //     const response: any = await WishListService.create({Host_code: host.Host_code});

  //     setIsLoading(false);

  //     if (response?.message) {
  //       Alert.alert("Booking Successful", response.message);
  //       router.push(`/trips`);
  //     } else {
  //       Alert.alert("Booking Failed", response?.message);
  //       return;
  //     }

  // };



  // const handleAddwishlist = async () => {


  //   // get items
  //     const response: any = await AddWishListService({Host_code: host.Host_code});

     

  //     if (response?.message) {
  //       Alert.alert("Wishlist Added Successful", response.message);
  //       router.push(`/trips`);
  //     } else {
  //       Alert.alert("Wishlist Failed", response?.message);
  //       return;
  //     }

  // };

  
  return (
    <ScrollView style={styles.container}>
      <Carousel
        style={styles.carousel}
        showsControls={false}
        dotStyle={styles.dotStyle}
        activeDotStyle={[styles.dotStyle, { backgroundColor: "white" }]}
      >
        {host.image.map((img) => (
          <Image
            style={styles.images}
            source={{ uri: img.secure_url }}
            key={host.Host_code}
          />
        ))}
      </Carousel>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.roundButtons}>
        <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
          <Ionicons name="share-outline" size={22} color={"#000"} />
        </TouchableOpacity>
        <TouchableOpacity 
       
        style={styles.roundButton}>
          <Ionicons name="heart-outline" size={22} color={"#000"} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{host.nom}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
            marginLeft: 20,
          }}
        >
          <Ionicons name="location-outline" size={20} color={"#000"} />
          <Text style={styles.address}>
            {host.address.address},{host.address.city},{host.address.country}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="person-outline" size={20} />
            <Text style={styles.infoText}> {host.guests}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="star-outline" size={20} />
            <Text style={styles.infoText}>{host.Rating}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="bed-outline" size={20} />
            <Text style={styles.infoText}> {host.bedrooms}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="water-outline" size={20} />
            <Text style={styles.infoText}> {host.baths}</Text>
          </View>
        </View>
        <View style={{ margin: 25, marginLeft: 20 }}>
          <Text style={styles.amenitiesTitle}>{t("Amenities")} :</Text>
          <Text style={styles.amenitiesDescreption}>
            {t("About the property's amenities and services")}
          </Text>
        </View>
        <View style={styles.amenitiesContainer}>
          {host.amenities && host.amenities.length > 0 ? (
            host.amenities.map(renderAmenity)
          ) : (
            <Text style={styles.noAmenities}>{t("No amenities listed")}</Text>
          )}
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.about}>{host.About}</Text>
        </View>
        <View style={styles.hostContainer}>
          <Text style={styles.hostCardTitle}>{t("Meet Your Host :")}</Text>
          <View style={styles.hostCardContainer}>
            <Image
              source={{ uri: host.image[0].secure_url }}
              style={styles.hostImage}
            />
            <Text style={styles.hostName}>Yassine Bouchama</Text>
          </View>
        </View>
        <Text style={[styles.hostCardTitle, { marginLeft: 20 }]}>
          {t("See our clients opinions :")}
        </Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ alignItems: "center" }}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.reviewsContainer}>
            {/* list of reviews */}
            <View style={styles.reviewContainer}>
              <View style={styles.reviewProfileContainer}>
                <Image
                  source={{ uri: host.image[3].secure_url }}
                  style={styles.reviewerImage}
                />
                <Text style={styles.reviewerName}>Omar</Text>
              </View>
              <Text style={styles.reviewMessage}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Possimus ullam alias praesentium magnam mollitia eum aut
                temporibus ipsam! Illo, mollitia!
              </Text>
            </View>
            <View style={styles.reviewContainer}>
              <View style={styles.reviewProfileContainer}>
                <Image
                  source={{ uri: host.image[3].secure_url }}
                  style={styles.reviewerImage}
                />
                <Text style={styles.reviewerName}>Omar</Text>
              </View>
              <Text style={styles.reviewMessage}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Possimus ullam alias praesentium magnam mollitia eum aut
                temporibus ipsam! Illo, mollitia!
              </Text>
            </View>
            <View style={styles.reviewContainer}>
              <View style={styles.reviewProfileContainer}>
                <Image
                  source={{ uri: host.image[3].secure_url }}
                  style={styles.reviewerImage}
                />
                <Text style={styles.reviewerName}>Omar</Text>
              </View>
              <Text style={styles.reviewMessage}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Possimus ullam alias praesentium magnam mollitia eum aut
                temporibus ipsam! Illo, mollitia!
              </Text>
            </View>
            <View style={styles.reviewContainer}>
              <View style={styles.reviewProfileContainer}>
                <Image
                  source={{ uri: host.image[3].secure_url }}
                  style={styles.reviewerImage}
                />
                <Text style={styles.reviewerName}>Omar</Text>
              </View>
              <Text style={styles.reviewMessage}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Possimus ullam alias praesentium magnam mollitia eum aut
                temporibus ipsam! Illo, mollitia!
              </Text>
            </View>
            <View style={styles.reviewContainer}>
              <View style={styles.reviewProfileContainer}>
                <Image
                  source={{ uri: host.image[3].secure_url }}
                  style={styles.reviewerImage}
                />
                <Text style={styles.reviewerName}>Omar</Text>
              </View>
              <Text style={styles.reviewMessage}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Possimus ullam alias praesentium magnam mollitia eum aut
                temporibus ipsam! Illo, mollitia!
              </Text>
            </View>
            <View style={styles.reviewContainer}>
              <View style={styles.reviewProfileContainer}>
                <Image
                  source={{ uri: host.image[3].secure_url }}
                  style={styles.reviewerImage}
                />
                <Text style={styles.reviewerName}>Omar</Text>
              </View>
              <Text style={styles.reviewMessage}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Possimus ullam alias praesentium magnam mollitia eum aut
                temporibus ipsam! Illo, mollitia!
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.price}>${host.price}</Text>
            <Text style={{ margin: 4 }}>night</Text>
          </View>
          <TouchableOpacity
            disabled={isLoading}
            // onPress={() => handleBook()}
            style={{ ...styles.addButton, opacity: isLoading ? 0.4 : 1 }}
          >
            <Text style={styles.addButtonText}>
              {isLoading ? "Booking" : t("Book")}
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
  carousel: {
    width: "100%",
    height: 450,
  },
  dotStyle: {
    width: 7,
    height: 7,
    backgroundColor: "silver",
    marginHorizontal: 3,
    borderRadius: 8,
  },
  images: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    elevation: 2,
  },
  roundButtons: {
    width: 80,
    position: "absolute",
    top: 40,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roundButton: {
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.primary,
    padding: 8,
    elevation: 2,
  },
  contentContainer: {
    paddingTop: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginVertical: 10,
    marginBottom: 15,
    marginLeft: 20,
  },
  address: {
    fontSize: 18,
    fontWeight: "400",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: "silver",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 17,
    marginLeft: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  amenitiesTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  amenitiesDescreption: {
    fontSize: 16,
    fontWeight: "400",
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingBottom: 15,
    marginLeft: 20,
  },
  amenity: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.4,
    padding: 8,
    borderRadius: 16,
    marginBottom: 12,
  },
  amenityText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  noAmenities: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  aboutContainer: {
    padding: 15,
    borderColor: "silver",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    margin: 20,
    marginTop: 0,
  },
  about: {
    fontSize: 14,
    color: "#666",
  },
  hostContainer: {
    padding: 8,
    borderBottomWidth: 0.5,
    margin: 20,
    marginTop: 0,
  },
  hostCardTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  hostCardContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.4,
    margin: 25,
    marginLeft: 40,
    padding: 15,
    width: "75%",
    height: 170,
    borderRadius: 16,
    elevation: 8,
    backgroundColor: "#fff",
  },
  hostImage: {
    width: 90,
    height: 90,
    borderWidth: 2.5,
    borderColor: "#6495ed",
    borderRadius: 50,
  },
  hostName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#333",
  },
  reviewsContainer: {
    flexDirection: "row",
    padding: 8,
  },
  reviewContainer: {
    borderWidth: 0.5,
    margin: 15,
    marginBottom: 25,
    padding: 15,
    width: 300,
    height: 175,
    borderRadius: 16,
    backgroundColor: "#f3f3f3",
  },
  reviewProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reviewerImage: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#6495ed",
    borderRadius: 30,
  },
  reviewerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  reviewMessage: {
    marginTop: 10,
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
});

export default Page;
