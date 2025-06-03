// src/stores/themeStore.ts
import { Appearance } from 'react-native';
import { create } from 'zustand';
import { ColorThemeInterface, LightTheme, themes } from '../constants/Theme'; // Sesuaikan path
type ThemeName = 'light' | 'dark';

interface ThemeState {
  themeName: ThemeName;
  theme: ColorThemeInterface;
  setSystemTheme: (newSchemeName: ThemeName) => void;
}

// Dapatkan tema sistem awal
const initialSystemScheme = Appearance.getColorScheme() || 'light';

export const useThemeStore = create<ThemeState>((set) => ({
  themeName: initialSystemScheme,
  theme: themes[initialSystemScheme] || LightTheme, // Fallback ke lightTheme jika ada yang aneh
  setSystemTheme: (newSchemeName) => {
    console.log('setSystemTheme dipanggil dengan:', newSchemeName);
    set({
      themeName: newSchemeName,
      theme: themes[newSchemeName] || LightTheme, // Selalu berikan fallback
    });
  },
}));

export const initializeThemeListener = () => {
  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    console.log("Appearance listener dipanggil, colorScheme:", colorScheme);
    const newScheme = colorScheme || 'light';
    useThemeStore.getState().setSystemTheme(newScheme);
  });
  return () => subscription.remove();
};