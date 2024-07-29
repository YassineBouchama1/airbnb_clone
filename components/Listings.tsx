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

  const { t, i18n } = useTranslation(); // Get the current language





  // GetHostes
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['reservations', selectedCategory],
    queryFn: () => LoadHostels(selectedCategory ?? ''),
  
  });



  // when selected category changed we reload the hostels from api by new selected category
  useEffect(() => {
    if (selectedCategory) {
      refetch();
    }
  }, [selectedCategory, refetch]);




  function onEndReached (){

    console.log("onEndReached")
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />

      ) : (
        data?.length > 0 ? (
          <BottomSheetFlatList 
            data={data}
            keyExtractor={(item:any) => item._id}
            renderItem={({ item }: { item: any }) => <HostCard item={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20, marginHorizontal: 20, marginTop: 20 }}
            ListHeaderComponent={data.length > 0 ? (
              <Text style={styles.hostsSum}>{data?.length} homes</Text>
            ) : null}
            onEndReached={onEndReached}
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
