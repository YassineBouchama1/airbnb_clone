import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import {COLORS} from '@/constants/theme';
import ProtectedRoute from '../helpers/ProtectedRoute';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Layout = () => {
  const { t } = useTranslation();

  return (
    <ProtectedRoute>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarLabelStyle: {
          fontFamily: 'mon-sb',
          paddingBottom: 6,
        },
      }}
      >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: t('Explore'),
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
        }}
        />
      <Tabs.Screen
        name="wishlists"
        options={{
          tabBarLabel: t('Wishlists'),
          tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />,
        }}
        />
      <Tabs.Screen
        name="reservations"
        options={{
          tabBarLabel: t('Reservations'),
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="airbnb" color={color} size={size} />,
        }}
        />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: t('Profile'),
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} />,
        }}
        />
    </Tabs>
        </GestureHandlerRootView>
          </ProtectedRoute>
  );
};

export default Layout;
