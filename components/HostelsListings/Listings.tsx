import React, { useCallback, useContext, useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { COLORS } from '@/constants/theme';
import { useInfiniteQuery } from '@tanstack/react-query';
import { LoadHostels } from '@/app/lib/hostelAPi';
import HostCard from './hostCard';
import { HostelsResponse, HostType } from '@/constants/types';
import { HostelContext } from '@/app/context/hostelContext';
import HostCardSkeleton from '../Skeletons/host-card-skeleton';



interface HostelWithUniqueKey extends HostType {
  uniqueKey: string;
}



const Listings: React.FC = () => {
  const { t } = useTranslation();
  const LIMIT = 4; // bumber of hostels to load at once

  const { selectedCategory } = useContext(HostelContext);


    // this fetches hostel data from the API with  infinite scrolling.
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery<HostelsResponse, Error>({
    queryKey: ['hostels', selectedCategory],
    queryFn: ({ pageParam = 1 }) => LoadHostels(selectedCategory ?? '', pageParam = 1, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.page < lastPage.pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1
  });


    // This combines all hostels from all pages and adds a unique key
  const allHostels: HostelWithUniqueKey[] = useMemo(() => 
    data?.pages.flatMap((page, pageIndex) => 
      page.hostels.map(hostel => ({...hostel, uniqueKey: `${pageIndex}-${hostel._id}`}))
    ) ?? [],
    [data]
  );

  // this loads more hostels when user scrolls to the bottom
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);



  // This renders each hostel card
  const renderItem = useCallback(({ item }: { item: HostelWithUniqueKey }) => (
    <HostCard item={item} />
  ), []);



  // display loading at footer while trying fetch more hosts
  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return <ActivityIndicator size="small" color={COLORS.primary} />;
    }
    return null;
  }, [isFetchingNextPage]);




  const keyExtractor = useCallback((item: HostelWithUniqueKey) => item.uniqueKey, []);


  // if ststus is pending render skeleton loading cards
  const ListEmptyComponent = useCallback(() => {
    if (status === 'pending') {
      return (
        <>
          {[...Array(3)].map((_, index) => (
           <HostCardSkeleton key={index}/>
          ))}
        </>
      );
    }


    // if there is a error display this message
    if (status === 'error') {
      return (
        <View style={styles.noListingsContainer}>
          <Text style={styles.noListingsText}>{t('Error loading hostels')}</Text>
          <Text style={styles.noListingsText}>The Server Need 50sec To Work For First Time </Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text style={styles.tryAgainText}>{t('Try again')}</Text>
          </TouchableOpacity>
        </View>
      );
    }


    if (allHostels.length === 0) {
      return (
        <View style={styles.noListingsContainer}>
          <Image
            source={{ uri: 'https://res.cloudinary.com/dofubyjcd/image/upload/v1717607025/system/meb4jgxbgoenfqj9ur7y.png' }}
            style={styles.noListingsImage}
          />
          <Text style={styles.noListingsText}>{t('No listings available for this category')}</Text>
        </View>
      );
    }

    return null;
  }, [status, allHostels.length, t, refetch]);

  return (
    <View style={{ flex: 1 }}>
      <BottomSheetFlatList 
        data={status === 'success' ? allHostels : []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, marginHorizontal: 20, marginTop: 20 }}
        ListHeaderComponent={
          status === 'success' ? (
            <Text style={styles.hostsSum}>{allHostels.length} home</Text>
          ) : null
        }
        ListEmptyComponent={ListEmptyComponent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        windowSize={5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
      />
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
  tryAgainText: {
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