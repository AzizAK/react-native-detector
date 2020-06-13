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

## Usage

```js
import { subscribe, unsubscribe } from 'react-native-detector';

// ...
React.useEffect(() => {
  const userDidScreenshot = () => {
    console.log('User took screenshot');
  };
  const eventEmitter = subscribe(userDidScreenshot);
  return () => {
    unsubscribe(eventEmitter);
  };
}, []);
```

## Roadmap

| Status | Goal                                   |
| :----: | :------------------------------------- |
|   ❌    | Android version of screenshot detector |
|   ❌    | Screen recording detecting             |
|   ❌    | Calls detector                         |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
