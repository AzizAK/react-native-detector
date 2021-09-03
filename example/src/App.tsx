import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { addScreenshotListener } from 'react-native-detector';

export default function App() {
  const [screenshotCounter, setScreenshotCounter] = React.useState<number>(0);

  React.useEffect(() => {
    const requestPermission = async () => {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Get Read External Storage Access',
          message: 'get read external storage access for detecting screenshots',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
    };
    if (Platform.OS === 'android') requestPermission();
    const userDidScreenshot = () => {
      setScreenshotCounter((screenshotCounter) => screenshotCounter + 1);
    };
    const unsubscribe = addScreenshotListener(userDidScreenshot);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>User took {screenshotCounter} screenshot</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
