import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import ListingsMap from '@/components/ListingsMap';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initReactI18next } from 'react-i18next';
import i18n from '../../services/i18n'


const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => (
            <ExploreHeader
              onSelectCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <ListingsMap selectedCategory={selectedCategory} />
        <ListingsBottomSheet selectedCategory={selectedCategory} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Page;
