import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Share } from 'react-native';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import {  useNavigation, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Carousel from 'pinar';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import Colors from '@/constants/Colors';
import hosts from '../constants/hosts.json';
import { HostType } from '@/constants/types';
import ListingsSkeleton from '@/skeletons/ListingsSkeleton';



const shareListing = async (item:HostType) => {
  if (!item || !item.Host_code) {
    console.error('Host data or Host code is not available.');
    alert('Host data or Host code is not available.');
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

    console.log('Shared successfully');
  } catch (error:any) {
    console.error('Error sharing listing:', error.message);
    alert(`Error sharing: ${error.message}`);
  }
};




const Listings = ({ selectedCategory }:{selectedCategory:null | string}) => {
  const [listings, setListings] = useState<HostType[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation(); // Get the current language
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      //fetch hosts
      await new Promise(resolve => setTimeout(resolve, 5000));

      setListings(hosts)
      setLoading(false)
}

    fetchData();
  }, [i18n.language]);


  // filter data for selectedCatagory
  const filteredListings = selectedCategory && selectedCategory !== 'all'
    ? listings.filter((listing:any) => listing.category.category_code === selectedCategory)
    : listings;


    // render  Card Listing
  const renderItem = ({ item }:{item:HostType}) => (

    <ListingsSkeleton/>
    // <Animated.View style={styles.card} entering={FadeInRight} exiting={FadeOutLeft}>
    //   <Carousel
    //     style={styles.carousel}
    //     showsControls={false}
    //     dotStyle={styles.dotStyle}
    //     activeDotStyle={[styles.dotStyle, { backgroundColor: 'white' }]}
    //   >
    //   {item.image.map((img:any) => (
    //     <TouchableOpacity
    //       key={item.Host_code}
    //       onPress={()=>router.push({
    //         pathname: 'listing/[Host_code]',
    //         params: { Host_code: item.Host_code }

    //     })}
    //       style={{ flex: 1 }}
    //     >
    //       <Image
    //         style={styles.image}
    //         source={{ uri: img.secure_url }}
    //       />
    //     </TouchableOpacity>
    //   ))}
    //   </Carousel>
    //   <TouchableOpacity style={styles.roundButton} onPress={() => shareListing(item)}>
    //     <AntDesign name="sharealt" size={16} color={'#000'} />
    //   </TouchableOpacity>
    //   <TouchableOpacity 
    //           onPress={()=>router.push({
    //             pathname: 'listing/[Host_code]',
    //             params: { Host_code: item.Host_code }

    //         })}
    //   >
    //     <View style={styles.cardContent}>
    //       <Text style={styles.title}>{item.nom}</Text>
    //       <Text style={styles.description}>{item.About}</Text>
    //       <View style={styles.infoRow}>
    //         <View style={{ flexDirection: 'row' }}>
    //           <Ionicons name="star" size={16} style={{ marginTop: 2.5 }} />
    //           <Text style={styles.rating}>{item.Rating}</Text>
    //         </View>
    //         <Text style={styles.price}>{t('Price')}: ${item.price}</Text>
    //       </View>
    //     </View>
    //   </TouchableOpacity>
    // </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        // <ActivityIndicator size="large" color={Colors.primary} />
    <>
        <ListingsSkeleton/>
        <ListingsSkeleton/>
        </>
      
      ) : (
        filteredListings.length > 0 ? (
          <BottomSheetFlatList 
            data={filteredListings}
            keyExtractor={(item:HostType) => item.Host_code}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20, marginHorizontal: 20, marginTop: 20 }}
            ListHeaderComponent={filteredListings.length > 0 ? (
              <Text style={styles.hostsSum}>{filteredListings.length} homes</Text>
            ) : null}
          />
        ) : (
          <View style={styles.noListingsContainer}>
            <Image
              source={{ uri: 'https://res.cloudinary.com/dofubyjcd/image/upload/v1717607025/system/meb4jgxbgoenfqj9ur7y.png' }}
              style={styles.noListingsImage}
            />
            <Text style={styles.noListingsText}>{t('No listings available for this category')}</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  carousel: {
    width: '100%',
    height: 250,
  },
  dotStyle: {
    width: 7,
    height: 7,
    backgroundColor: 'silver',
    marginHorizontal: 3,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  roundButton:{
    position: 'absolute', 
    right: 6, 
    top: 8,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
    padding: 8,
    elevation: 2,
    // borderRadius: 18,
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  noListingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0D0D0',
  },
  noListingsImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 20,
  },
  noListingsText: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
  },
  hostsSum: {
    textAlign: 'center',
    fontFamily: 'mon-b',
    fontSize: 14,
  }
});

export default Listings;
