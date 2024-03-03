import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@tamagui/core';
import { Pressable } from 'react-native';
import CameraScreen from '../screens/CameraScreen';
import ComparisonScreen from '../screens/ComparisonScreen';
import { Typography } from '../components/Typography';
import { BottomTabNavigation } from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

export const Navigation = (): React.JSX.Element => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    >
      <Stack.Screen
        name='Root'
        options={{ headerShown: false }}
        component={BottomTabNavigation}
      />

      <Stack.Screen
        name='CameraScreen'
        component={CameraScreen}
        options={({ navigation }) => ({
          headerTitle: 'Camera',
          headerTitleStyle: {
            color: theme.textDefault.val,
          },
          headerStyle: {
            backgroundColor: theme.background.val,
          },
          headerLeft: (props) => {
            return (
              <Pressable
                hitSlop={20}
                style={{ width: 60 }}
                {...props}
                onPress={() => {
                  if (props.canGoBack) {
                    navigation.goBack();
                  }
                }}
              >
                <Typography>Go back</Typography>
              </Pressable>
            );
          },
        })}
      />
      <Stack.Screen
        name='Comparison'
        component={ComparisonScreen}
        options={({ navigation }) => ({
          headerTitle: 'Comparison',
          headerTitleStyle: {
            color: theme.textDefault.val,
          },
          headerStyle: {
            backgroundColor: theme.background.val,
          },
          headerLeft: (props) => {
            return (
              <Pressable
                hitSlop={20}
                style={{ width: 60 }}
                {...props}
                onPress={() => {
                  if (props.canGoBack) {
                    navigation.goBack();
                  }
                }}
              >
                <Typography>Go back</Typography>
              </Pressable>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};
