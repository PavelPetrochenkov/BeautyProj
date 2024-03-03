import { ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { config } from '@tamagui/config';
import { createTamagui, TamaguiProvider } from '@tamagui/core';
import { useStore } from '../store/store';

const tamaguiConfig = createTamagui({
  ...config,
  themes: {
    light: {
      primary: '#6200ee',
      textDefault: '#E24AED',
      background: '#f6f6f6',
      card: '#ffffff',
      text: '#000000',
      border: '#000000',
    },
    dark: {
      primary: '#bb86fc',
      textDefault: '#DAA9E0',
      background: '#151116',
      card: '#1e1e1e',
      text: '#ffffff',
      border: '#ffffff',
    },
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const TamaguiThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const { onLightThemeChange, isLightTheme } = useThemeHandler();

  useEffect(() => {
    if (colorScheme === 'dark') {
      onLightThemeChange(false);
    } else if (colorScheme === 'light') {
      onLightThemeChange(true);
    }
  }, [colorScheme]);

  return (
    <TamaguiProvider
      config={tamaguiConfig}
      defaultTheme={isLightTheme ? 'light' : 'dark'}
    >
      {children}
    </TamaguiProvider>
  );
};

export const useThemeHandler = () => {
  const isLightTheme = useStore((store) => store.isLightTheme);
  const setLightTheme = useStore((store) => store.setLightTheme);

  const onLightThemeChange = (value: boolean) => {
    setLightTheme(value);
  };

  return {
    isLightTheme,
    onLightThemeChange,
  };
};
