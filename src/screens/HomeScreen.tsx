import {useNavigation} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Detail');
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="Go to Detail screen" onPress={handlePress} />
    </View>
  );
}
