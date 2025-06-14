import { useAppThemes } from "@/hooks/useAppThemes";
import { globalStyle } from "./globalStyle";

export const useGlobalStyles = () => {
  const { theme } = useAppThemes();
  return globalStyle(theme);
};
