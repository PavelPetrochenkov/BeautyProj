import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavBar } from '../components/BottomNavBar';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/Settings';

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigation = (): React.JSX.Element => {
  return (
    <BottomTab.Navigator
      tabBar={(props) => <BottomNavBar {...props} />}
      initialRouteName={'Home'}
    >
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};
