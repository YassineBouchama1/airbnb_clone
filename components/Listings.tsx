import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Share } from 'react-native';
import * as FileSystem from 'expo-file-system';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import Carousel from 'pinar';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import hosts from '../constants/hosts.json';
import { HostType } from '@/constants/types';
import ListingsSkeleton from '@/skeletons/ListingsSkeleton';
import { COLORS } from '@/constants/theme';
import { useQuery } from '@tanstack/react-query';
import { LoadHostels } from '@/app/lib/hostelAPi';
import HostCard from './hostCard';







const Listings = ({ selectedCategory }:{selectedCategory:null | string}) => {
  const [listings, setListings] = useState<HostType[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation(); // Get the current language



  useEffect(() => {
    const fetchData = async () => {
      //fetch hosts
      await new Promise(resolve => setTimeout(resolve, 2000));

      setListings(hosts)
      setLoading(false)
}

    fetchData();
  }, [i18n.language]);




  // GetReservations
  const { data, isLoading, isError, error, refetch } = useQuery({ queryKey: ['reservations'], queryFn: LoadHostels });




 // filter data for selectedCategory 
 const filteredListings = useMemo(() => {
  return selectedCategory && selectedCategory !== 'all'
    ? listings.filter((listing: any) => listing.category.category_code === selectedCategory)
    : listings;
}, [selectedCategory, listings]);





  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />

      ) : (
        filteredListings.length > 0 ? (
          <BottomSheetFlatList 
            data={filteredListings}
            keyExtractor={(item:HostType) => item.Host_code}
            renderItem={({ item }: { item: HostType }) => <HostCard item={item} />}
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
    color: COLORS.grey,
    textAlign: 'center',
  },
  hostsSum: {
    textAlign: 'center',
    fontFamily: 'mon-b',
    fontSize: 14,
  }
});

export default Listings;
