import { useNavigation } from '@react-navigation/native';
import { Button, Stack } from 'tamagui';
import { useStore } from '../store/store';
import { Card } from '../components/Card';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../components/Typography';

export default function HomeScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const imageUriFrom = useStore((state) => state.imageUriFrom);
  const imageUriTo = useStore((state) => state.imageUriTo);

  const handlePressFrom = () => {
    navigation.navigate('CameraScreen', { section: 'from' });
  };

  const handlePressTo = () => {
    navigation.navigate('CameraScreen', { section: 'to' });
  };

  const handlePressComparison = () => {
    navigation.navigate('Comparison');
  };
  return (
    <Stack flex={1} backgroundColor='$background'>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: top + 24,
          paddingBottom: bottom + 24,
          gap: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Card
          label='Before'
          onPressCreatePhoto={handlePressFrom}
          date={imageUriFrom.date}
          uri={imageUriFrom.uri}
        />
        <Card
          label='After'
          onPressCreatePhoto={handlePressTo}
          date={imageUriTo.date}
          uri={imageUriTo.uri}
        />
        {imageUriTo.uri && imageUriFrom.uri ? (
          <Stack alignItems='center'>
            <Button
              backgroundColor='$primary'
              onPress={handlePressComparison}
              width='80%'
            >
              <Typography variant='lg' color='white'>
                Compare
              </Typography>
            </Button>
          </Stack>
        ) : null}
      </ScrollView>
    </Stack>
  );
}
