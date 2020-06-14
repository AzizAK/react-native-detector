# react-native-detector

a simply and easy to use screenshot detector for react native

## Installation

yarn

```sh
yarn add react-native-detector
```

npm

```sh
npm install react-native-detector
```

### iOS

```sh
cd ios && pod install
```

### android

for Android you need to have access for `READ_EXTERNAL_STORAGE` to detect screenshots by user to do that you just need to add this line in `AndroidManifest.xml`

```xml
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

and get user permission

```js
import { PermissionsAndroid } from 'react-native';

//...
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
```

## Usage

```js
import {
  addScreenshotListener,
  removeScreenshotListener,
} from 'react-native-detector';

// ...
React.useEffect(() => {
  const userDidScreenshot = () => {
    console.log('User took screenshot');
  };
  const listener = addScreenshotListener(userDidScreenshot);
  return () => {
    removeScreenshotListener(listener);
  };
}, []);
```

## Roadmap

|         Status          | Goal                                   |
| :---------------------: | :------------------------------------- |
|           ✅            | iOS version of screenshot detector     |
| ✅ (Thanks to @mhssn95) | Android version of screenshot detector |
|           🚧            | Screen recording detecting             |
|           🚧            | Calls detector                         |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
