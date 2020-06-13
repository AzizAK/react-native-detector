import { NativeModules, NativeEventEmitter } from 'react-native';
const { Detector } = NativeModules;

enum EventsName {
  UserDidTakeScreenshot = 'UIApplicationUserDidTakeScreenshotNotification',
}
export function subscribe(callback: Function) {
  const eventEmitter = new NativeEventEmitter(Detector);
  eventEmitter.addListener(
    EventsName.UserDidTakeScreenshot,
    (e) => callback(e),
    {}
  );

  return eventEmitter;
}

export function unsubscribe(eventEmitter: NativeEventEmitter) {
  eventEmitter.removeAllListeners(EventsName.UserDidTakeScreenshot);
}
