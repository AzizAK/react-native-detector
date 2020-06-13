import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { subscribe, unsubscribe } from 'react-native-detector';

export default function App() {
  const [screenshotCounter, setScreenshotCounter] = React.useState<number>(0);

  React.useEffect(() => {
    const userDidScreenshot = () => {
      //passe a function to state setter to get fresh state value
      setScreenshotCounter((screenshotCounter) => screenshotCounter + 1);
    };
    const eventEmitter = subscribe(userDidScreenshot);
    return () => {
      unsubscribe(eventEmitter);
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
