import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { COLORS } from '@/constants/theme';
import { useInfiniteQuery } from '@tanstack/react-query';
import { LoadHostels } from '@/app/lib/hostelAPi';
import HostCard from './hostCard';
import { HostType } from '@/constants/types';
import { HostelContext } from '@/app/context/hostelContext';

interface HostelsResponse {
  hostels: HostType[];
  total: number;
  page: number;
  pages: number;
}

const Listings = () => {
  const { t } = useTranslation();
  const LIMIT = 4;

  const { selectedCategory, setSelectedCategory, maxDistanceKm, setMaxDistanceKm } = useContext(HostelContext);

// console.log(selectedCategory)
  //  infinit scrolling for hostels
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery<HostelsResponse, Error>({
    queryKey: ['hostels', selectedCategory],
    // pass parameters to Fun LoadHostels To Fetch Hostels
    queryFn: ({ pageParam }) => LoadHostels(selectedCategory ?? '', pageParam = 1, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.page < lastPage.pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1
  });




  // compaine
  const allHostels = useMemo(() => 
    data?.pages.flatMap((page, pageIndex) => 
      page.hostels.map(hostel => ({...hostel, uniqueKey: `${pageIndex}-${hostel._id}`}))
    ) ?? [],
    [data]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(({ item }: { item: HostType }) => (
    <HostCard item={item} />
  ), []);

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return <ActivityIndicator size="small" color={COLORS.primary} />;
    }
    return null;
  }, [isFetchingNextPage]);

  const keyExtractor = useCallback((item: HostType & { uniqueKey: string }) => item.uniqueKey, []);

  if (status === 'pending') {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  if (status === 'error') {
    return (
      <View style={styles.noListingsContainer}>
        <Text style={styles.noListingsText}>{t('Error loading hostels')}</Text>
        <Text style={styles.noListingsText}>The Server Need 50sec To Work For First Time </Text>
        <TouchableOpacity onPress={ async()=>await refetch()}>
          <Text style={styles.tryAgainText}>{t('Try again')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {allHostels.length > 0 ? (
        <BottomSheetFlatList 
          data={allHostels}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, marginHorizontal: 20, marginTop: 20 }}
          ListHeaderComponent={
            <Text style={styles.hostsSum}>{allHostels?.length} home</Text>
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          windowSize={5} // Adjust this value as needed
          // getItemLayout={getItemLayout} // Uncomment and implement if items have fixed height
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
        />
      ) : (
        <View style={styles.noListingsContainer}>
          <Image
            source={{ uri: 'https://res.cloudinary.com/dofubyjcd/image/upload/v1717607025/system/meb4jgxbgoenfqj9ur7y.png' }}
            style={styles.noListingsImage}
          />
          <Text style={styles.noListingsText}>{t('No listings available for this category')}</Text>
        </View>
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
  tryAgainText:{
    marginTop: 10,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noListingsImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 20,
  },
  noListingsText: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
  },
  hostsSum: {
    textAlign: 'center',
    fontFamily: 'mon-b',
    fontSize: 14,
  }
});

export default Listings;
