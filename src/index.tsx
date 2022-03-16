import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const { Detector } = NativeModules;

enum EventsName {
  UserDidTakeScreenshot = 'UIApplicationUserDidTakeScreenshotNotification',
}

const detectorEventEmitter = new NativeEventEmitter();

type Unsubscribe = () => void;

const commonAddScreenshotListener = (listener: () => void): Unsubscribe => {
  const eventSubscription = detectorEventEmitter.addListener(
    EventsName.UserDidTakeScreenshot,
    () => listener(),
    {}
  );

  return () => {
    eventSubscription.remove();
  };
};

const getListenersCount = (): number => {
  return (
    // React Native 0.64+
    // @ts-ignore
    detectorEventEmitter.listenerCount?.(EventsName.UserDidTakeScreenshot) ??
    // React Native < 0.64
    // @ts-ignore
    detectorEventEmitter.listeners?.(EventsName.UserDidTakeScreenshot).length ??
    0
  );
};

export const addScreenshotListener = Platform.select<
  (listener: () => void) => Unsubscribe
>({
  default: (): Unsubscribe => () => {},
  ios: commonAddScreenshotListener,
  android: (listener: () => void): Unsubscribe => {
    if (getListenersCount() === 0) {
      Detector.startScreenshotDetection();
    }

    const unsubscribe: Unsubscribe = commonAddScreenshotListener(listener);

    return () => {
      unsubscribe();

      if (getListenersCount() === 0) {
        Detector.stopScreenshotDetection();
      }
    };
  },
});
