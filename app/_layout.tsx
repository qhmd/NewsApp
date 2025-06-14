import { useAppThemes } from "@/hooks/useAppThemes";
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initializeThemeListener } from '@/stores/themeStores';
import { StatusBar } from 'react-native';

function RootNav() {
  const {themeName} = useAppThemes()
  console.log(themeName)
  return (
    <>
      <StatusBar barStyle={themeName === 'light' ? 'dark-content' : 'light-content'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>

  );
}

export default function RootLayout() {
  useEffect(() => {
    // Inisialisasi listener untuk perubahan tema sistem
    const unsubscribe = initializeThemeListener();
    // Cleanup listener saat komponen RootLayout unmount (meskipun jarang terjadi untuk root)
    return () => unsubscribe();
  }, []);
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <RootNav/>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
