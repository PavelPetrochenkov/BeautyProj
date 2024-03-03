import { Button, Image, Stack, Text } from 'tamagui';
import { useStore } from '../store/store';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../components/Typography';
import { useThemeHandler } from '../theme';

export default function SettingsScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const clearHomeSlice = useStore((state) => state.clearHomeSlice);
  const { isLightTheme, onLightThemeChange } = useThemeHandler();

  const handleThemeChange = () => {
    onLightThemeChange(!isLightTheme);
  };
  return (
    <Stack flex={1} backgroundColor='$background'>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: top + 24,
          paddingBottom: bottom + 24,
          gap: 24,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Stack alignItems='center' gap={24}>
          <Typography variant='lg'>Settings</Typography>
          <Button onPress={clearHomeSlice} backgroundColor='$primary'>
            <Typography color='$card'>Reset photos</Typography>
          </Button>
          <Button onPress={handleThemeChange} backgroundColor='$primary'>
            <Typography color='$card'>Change theme</Typography>
          </Button>
        </Stack>
      </ScrollView>
    </Stack>
  );
}
