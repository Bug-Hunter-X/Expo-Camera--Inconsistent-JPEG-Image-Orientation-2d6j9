This bug occurs when using the Expo `Camera` API with certain image formats. Specifically, when attempting to capture an image using the JPEG format, the image may be saved with an incorrect orientation, resulting in a rotated image.  This is inconsistent and appears to be linked to the underlying camera hardware and/or Expo's handling of image metadata.

```javascript
// bug.js
import * as ExpoCamera from 'expo-camera';
import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync({ quality: 1, base64: true, format: ExpoCamera.Constants.ImageFormat.jpeg });
        setPhoto(data.base64);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <ExpoCamera.Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Button title="Take Picture" onPress={takePicture} />
        </View>
      </ExpoCamera.Camera>
      {photo && <Image source={{ uri: `data:image/jpeg;base64,${photo}` }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  image: {
    flex:1,
    width:null,
    height:null
  }
});

export default App;
```