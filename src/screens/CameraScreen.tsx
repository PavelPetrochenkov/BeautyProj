import { useNavigation, useRoute } from '@react-navigation/native';
import { Stack, isAndroid } from '@tamagui/core';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Camera,
  Orientation,
  useCameraDevices,
  useCameraFormat,
} from 'react-native-vision-camera';
import { Button } from 'tamagui';
import { useStore } from '../store/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Typography } from '../components/Typography';
import ImageResizer from '@bam.tech/react-native-image-resizer';

function orientationToRotationAngle(orientation: Orientation) {
  switch (orientation) {
    case 'landscape-right':
      return 90; // fix android front camera
    default:
      return 0;
  }
}

export default function CameraScreen() {
  const {
    params: { section },
  } = useRoute();

  const { replace } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const [hasPermission, setHasPermission] = useState(false);
  const [height, setHeight] = useState<number>(1);
  const [width, setWidth] = useState<number>(1);
  const [imageUri, setImageUri] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true);

  const camera = useRef(null);

  const devices = useCameraDevices();
  const device = devices[1];

  const changeImageUriFrom = useStore((state) => state.changeImageUriFrom);
  const changeImageUriTo = useStore((state) => state.changeImageUriTo);

  const handleTakePhoto = useCallback(async () => {
    const photo = await camera?.current?.takePhoto();
    const uri = isAndroid
      ? (
          await ImageResizer.createResizedImage(
            'file://' + photo?.path || '',
            1200,
            720,
            'JPEG',
            90,
            orientationToRotationAngle(device.sensorOrientation)
          )
        ).uri
      : photo.path;
    setImageUri(uri);
    setTime(Date.now());
    setIsCameraActive(false);
  }, [device.sensorOrientation]);

  const requestCameraPermission = async () => {
    const status = await Camera.requestCameraPermission();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const format = useCameraFormat(device, [
    {
      photoResolution: 'max',
    },
  ]);

  const handleSave = () => {
    if (section === 'from') {
      changeImageUriFrom({ uri: imageUri, date: time });
      replace('Root');
    }

    if (section === 'to') {
      changeImageUriTo({ uri: imageUri, date: time });
      replace('Root');
    }
  };

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
            resizeMode='cover'
            device={device}
            isActive={isCameraActive}
            zoom={0}
            photo={true}
            orientation='portrait'
          />
        ) : null}
        {imageUri ? (
          <>
            <Image
              style={[styles.image, { height: height, width: width }]}
              source={{ uri: imageUri }}
              resizeMode='contain'
            />
          </>
        ) : null}
        <View
          style={{
            position: 'absolute',
            bottom: bottom + 54,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          {!imageUri ? (
            <TouchableOpacity onPress={handleTakePhoto}>
              <View
                style={{
                  width: 72,
                  height: 72,
                  backgroundColor: 'white',
                  borderRadius: 99999,
                }}
              />
            </TouchableOpacity>
          ) : (
            <Stack gap={16} flexDirection='row'>
              <Button
                backgroundColor='$primary'
                color='$card'
                onPress={handleSave}
                width={120}
              >
                Save
              </Button>
              <Button
                backgroundColor='$secondary'
                color='$textDefault'
                onPress={() => {
                  setIsCameraActive(true);
                  setImageUri('');
                }}
                width={120}
              >
                Retake
              </Button>
            </Stack>
          )}
        </View>
      </View>
    </ScrollView>
  ) : (
    <Stack
      justifyContent='center'
      alignContent='center'
      flex={1}
      gap={24}
      paddingHorizontal={24}
    >
      <Typography>No available cameras</Typography>
      <Button onPress={requestCameraPermission} backgroundColor='$primary'>
        <Typography>Ask permission for camera</Typography>
      </Button>
    </Stack>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black',
  },
  cameraStyle: {
    flex: 1,
    alignSelf: 'stretch',
  },
  image: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 5,
  },
});
