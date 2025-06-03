import { ColorThemeInterface } from "@/constants/Theme";
import { useThemeStore } from "@/stores/themeStores";
interface useAppThemeOutput {
    theme: ColorThemeInterface,
    themeName: 'light' | 'dark',
}

export const useAppThemes = (): useAppThemeOutput => {
  const theme = useThemeStore((state) => state.theme)
  const themeName = useThemeStore((state) => state.themeName)
    return { theme, themeName };
};
