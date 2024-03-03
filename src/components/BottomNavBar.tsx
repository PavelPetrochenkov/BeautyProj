import { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useTheme } from 'tamagui';
import { isIos } from '../constants';
import { Typography } from './Typography';

export function BottomNavBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <Stack>
      <Stack
        paddingHorizontal={24}
        borderTopColor='$primary'
        borderWidth={1}
        paddingTop={16}
        flexDirection='row'
        gap={24}
        style={{ paddingBottom: insets.bottom + (isIos ? 0 : 8) }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TouchableOpacity
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
            >
              <Typography
                style={{
                  color: isFocused ? theme.textDefault.val : theme.text.val,
                }}
              >
                {label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </Stack>
    </Stack>
  );
}
