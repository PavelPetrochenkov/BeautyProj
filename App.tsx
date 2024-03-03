import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { TamaguiProvider, View, createTamagui, useTheme } from '@tamagui/core';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigation } from './src/navigation';
import { TamaguiThemeProvider } from './src/theme';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiThemeProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </TamaguiThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
