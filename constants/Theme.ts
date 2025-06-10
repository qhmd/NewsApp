export interface ColorThemeInterface {
  name: 'dark' | 'light';
  background: string;
  text: string;
  primary: string;   // harus string, bukan literal
  card: string;
  border: string;
  bgTextInput:string
  placeHolder: 'gray'
}

export const LightTheme: ColorThemeInterface = {
  name: 'light',
  background: '#fff',
  text: 'black',
  primary: '#eb1a2f', // tambah # supaya konsisten
  card: 'white',
  border: '#f0f0f0',
  bgTextInput : '#e8e8e8',
  placeHolder : 'gray'
};

export const DarkTheme: ColorThemeInterface = {
  name: 'dark',
  background: '#212121', // perbaiki typo
  text: 'white',
  primary: '#eb1a2f',
  card: 'black',
  border: '#141414',
  bgTextInput: '#2e2e2e',
  placeHolder : 'gray'
};

export const themes: Record<'light' | 'dark', ColorThemeInterface> = {
  light: LightTheme,
  dark: DarkTheme,
};
