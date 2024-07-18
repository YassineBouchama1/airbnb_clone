import React from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import LanguageSwitcher from '../components/LanguageSwitcher';
import i18n from '../services/i18n';
import { useTranslation } from 'react-i18next';
import AuthProvider from './AuthContext';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

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
    <AuthProvider>
      <Stack>

        {/* // if user dosnt login display this */}
        <Stack.Screen
          name="(modals)/login"
          options={{
            presentation: 'modal',
            title: t('Log in or sign up'),
            headerTitleStyle: {
              fontFamily: 'mon-sb',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
          />
        <Stack.Screen
          name="(modals)/register"  // Ensure the name here matches exactly what you're navigating to
          options={{
            headerTitle: '', 
            // headerShown: false ,
            presentation: 'modal',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
          />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="listing/[Host_code]" options={{ headerTitle: '', headerShown: false }} />
        <Stack.Screen
          name="(modals)/booking"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
          />
      </Stack>
  
  </AuthProvider>
  );
}
