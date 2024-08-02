import React from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {  TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import i18n from '../services/i18n';
import { useTranslation } from 'react-i18next';
import AuthProvider from './context/AuthContext';
import { HostelProvider } from './context/hostelContext';
import { ThemeProvider } from './context/ThemeContext';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();


const queryClient = new QueryClient();


export default function RootLayout() {

  i18n.init()
  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <ThemeProvider>

    <HostelProvider>

    <QueryClientProvider client={queryClient}>

    <AuthProvider>
      <Stack>

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="listing/details" options={{ headerTitle: '', headerShown: false }} />
        <Stack.Screen
          name="(modals)/booking"
          options={{
            presentation: 'modal',
            animation: 'fade',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
          />
          <Stack.Screen
        name="(modals)/filter"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: 'modal',
        }}
        />
      </Stack>
  

  </AuthProvider>
  </QueryClientProvider>
          </HostelProvider>
        </ThemeProvider>
  );
}


