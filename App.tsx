import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigation } from './src/navigation';
import { TamaguiThemeProvider } from './src/theme';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

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
