import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import ListingsMap from '@/components/ListingsMap';
import ListingsBottomSheet from '@/components/HostelsListings/ListingsBottomSheet';

import i18n from '../../services/i18n'


const Page = () => {

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <ExploreHeader />
          ),
        }}
      />
      <View style={styles.container}>
        <ListingsMap  />
        <ListingsBottomSheet  />
      </View>

          </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Page;
