import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
const { Detector } = NativeModules;

enum EventsName {
  UserDidTakeScreenshot = 'UIApplicationUserDidTakeScreenshotNotification',
}

export function addScreenshotListener(callback: Function) {
  if (Platform.OS === 'android') Detector.startScreenshotDetection();
  const eventEmitter = new NativeEventEmitter(Detector);
  eventEmitter.addListener(
    EventsName.UserDidTakeScreenshot,
    () => callback(),
    {}
  );

  return eventEmitter;
}

export function removeScreenshotListener(eventEmitter: NativeEventEmitter) {
  eventEmitter.removeAllListeners(EventsName.UserDidTakeScreenshot);
  if (Platform.OS === 'android') Detector.stopScreenshotDetection();
}
