import { Image, Stack } from 'tamagui';
import { useStore } from '../store/store';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import { Typography } from '../components/Typography';
import { useState } from 'react';

const AnimatedStack = Animated.createAnimatedComponent(Stack);
const AnimatedImage = Animated.createAnimatedComponent(Image);

const IMAGE_WIDTH = 250;
const IMAGE_HEIGHT = 400;

export default function ComparisonScreen() {
  const imageUriFrom = useStore((state) => state.imageUriFrom);
  const imageUriTo = useStore((state) => state.imageUriTo);

  const offset = useSharedValue(0);
  const [pressed, setPressed] = useState(false);
  const [isShowingBefore, setIsShowingBefore] = useState(true);

  const pan = Gesture.Pan()
    .onBegin(() => {
      runOnJS(setPressed)(true);
    })
    .onChange((event) => {
      if (isShowingBefore) {
        offset.value = event.translationX;
      } else {
        offset.value = IMAGE_WIDTH + event.translationX;
      }
    })
    .onFinalize(() => {
      if (offset.value > IMAGE_WIDTH / 2) {
        offset.value = withTiming(IMAGE_WIDTH, { duration: 200 });
        runOnJS(setIsShowingBefore)(false);
      } else {
        offset.value = withTiming(0, { duration: 200 });
        runOnJS(setIsShowingBefore)(true);
      }
      runOnJS(setPressed)(false);
    });

  const styleA = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            offset.value,
            [0, IMAGE_WIDTH],
            [0, IMAGE_WIDTH],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: interpolate(
        offset.value,
        [0, IMAGE_WIDTH],
        [0, IMAGE_WIDTH],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 24,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Stack alignItems='center' height={32}>
        {pressed ? null : (
          <Typography variant='lg'>
            {isShowingBefore ? 'Before' : 'After'}
          </Typography>
        )}
      </Stack>

      <Stack width={IMAGE_WIDTH} backgroundColor='gray' position='relative'>
        <AnimatedImage
          style={[{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT, zIndex: 1 }]}
          source={{ uri: imageUriFrom.uri }}
          resizeMode='contain'
        />
        <AnimatedStack
          position='absolute'
          zIndex={2}
          style={animatedWidth}
          overflow={'hidden'}
        >
          <AnimatedImage
            style={[{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }]}
            source={{ uri: imageUriTo.uri }}
            resizeMode='contain'
          />
        </AnimatedStack>
      </Stack>
      <Animated.View />
      <AnimatedStack
        backgroundColor='gray'
        borderRadius={999}
        width={IMAGE_WIDTH}
        height={4}
        position='relative'
        marginTop={24}
      >
        <AnimatedStack
          backgroundColor='$textDefault'
          borderRadius={999}
          height={4}
          position='absolute'
          style={animatedWidth}
        />
        <GestureDetector gesture={pan}>
          <AnimatedStack
            width={24}
            height={24}
            backgroundColor='white'
            shadowColor='#000'
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.15}
            shadowRadius={25}
            elevationAndroid={15}
            borderRadius={999}
            top={-11}
            left={-12}
            style={[styleA]}
          />
        </GestureDetector>
        <Stack position='absolute' left={-24} top={24}>
          <Typography variant='md'>Before</Typography>
        </Stack>
        <Stack position='absolute' right={-24} top={24}>
          <Typography variant='md'>After</Typography>
        </Stack>
      </AnimatedStack>
    </ScrollView>
  );
}
