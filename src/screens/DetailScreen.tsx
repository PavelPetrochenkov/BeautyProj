import * as React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {
  useFrameProcessor,
  Camera,
  useCameraDevices,
  useCameraFormat,
  useCodeScanner,
} from 'react-native-vision-camera';

const prepareData = (data: any) => {
  return Object.values(data).map((block: any) => ({
    ...block,
    cornerPoints: Object.values(block.cornerPoints),
  }));
};

export default function DetailScreen() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [height, setHeight] = React.useState<number>(1);
  const [width, setWidth] = React.useState<number>(1);
  const [imageUri, setImageUri] = React.useState<string>('');
  const [isCameraActive, setIsCameraActive] = React.useState<boolean>(true);
  const camera = React.useRef(null);

  const handleTakePhoto = React.useCallback(async () => {
    const photo = await camera?.current?.takePhoto();
    setImageUri((Platform.OS === 'android' ? 'file://' : '') + photo.path);
  }, []);

  const closeCamera = () => setIsCameraActive(false);

  const devices = useCameraDevices();
  const device = devices[0];

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const format = useCameraFormat(device, [
    {
      photoResolution: 'max',
    },
  ]);


  return device !== undefined && hasPermission ? (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={styles.cameraContainer}
        onLayout={(event) => {
          setHeight(event.nativeEvent.layout.height);
          setWidth(event.nativeEvent.layout.width);
        }}
      >
        {isCameraActive ? (
          <Camera
            ref={camera}
            style={[styles.cameraStyle]}
            resizeMode="contain"
            device={device}
            isActive={isCameraActive}
            zoom={0}
            format={Platform.OS !== 'ios' ? format : undefined}
            pixelFormat="yuv"
            photo={true}
          />
        ) : null}
        {imageUri ? (
          <Image
            style={[styles.image, { height: height, width: width }]}
            source={{ uri: imageUri }}
            resizeMode="contain"
          />
        ) : null}
      
      </View>
    </ScrollView>
  ) : (
    <View>
      <Text>No available cameras</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black',
  },
  container: {
    position: 'relative',
    margin: 12,
    marginBottom: 120,
  },
  textInputStyle: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 5,
    minHeight: 40,
    color: 'white',
  },
  cameraStyle: {
    flex: 1,
    alignSelf: 'stretch',
  },
  btnStyle: {
    flex: 1,
  },
  btnController: {
    gap: 8,
    flexDirection: 'row',
  },
  image: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 5,
  },
});
