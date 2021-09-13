import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

describe('addScreenshotListener', () => {
  const createIsolatedTest = (
    type: 'ios' | 'android',
    isolatedTest: (options: {
      addScreenshotListener: (listener: () => void) => () => void;
      emitScreenshot: () => void;
    }) => void
  ) => () => {
    jest.isolateModules(() => {
      NativeModules.Detector = {
        addListener: jest.fn(),
        removeListeners: jest.fn(),
        startScreenshotDetection: jest.fn(),
        stopScreenshotDetection: jest.fn(),
      };

      const emitter = new NativeEventEmitter(NativeModules.Detector);

      Platform.select = (spec: any) => spec[type];

      const { addScreenshotListener } = require('../index');

      const emitScreenshot = () => {
        emitter.emit('UIApplicationUserDidTakeScreenshotNotification');
      };

      isolatedTest({ addScreenshotListener, emitScreenshot });
    });
  };

  describe('iOS', () => {
    it(
      'should invoke each passed listener',
      createIsolatedTest('ios', ({ emitScreenshot, addScreenshotListener }) => {
        const listener1 = jest.fn();
        const listener2 = jest.fn();

        addScreenshotListener(listener1);
        addScreenshotListener(listener2);

        emitScreenshot();

        expect(listener1).toHaveBeenCalledTimes(1);
        expect(listener2).toHaveBeenCalledTimes(1);
      })
    );

    it(
      'should not invoke passed listener when unsubscribe',
      createIsolatedTest('ios', ({ emitScreenshot, addScreenshotListener }) => {
        const listener = jest.fn();

        const unsubscribe = addScreenshotListener(listener);

        emitScreenshot();

        expect(listener).toHaveBeenCalledTimes(1);

        unsubscribe();

        emitScreenshot();

        expect(listener).toHaveBeenCalledTimes(1);
      })
    );
  });

  describe('Android', () => {
    it(
      'should invoke each passed listener',
      createIsolatedTest(
        'android',
        ({ emitScreenshot, addScreenshotListener }) => {
          const listener1 = jest.fn();
          const listener2 = jest.fn();

          addScreenshotListener(listener1);
          addScreenshotListener(listener2);

          emitScreenshot();

          expect(listener1).toHaveBeenCalledTimes(1);
          expect(listener2).toHaveBeenCalledTimes(1);
        }
      )
    );

    it(
      'should not invoke passed listener when unsubscribe',
      createIsolatedTest(
        'android',
        ({ emitScreenshot, addScreenshotListener }) => {
          const listener = jest.fn();

          const unsubscribe = addScreenshotListener(listener);

          emitScreenshot();

          expect(listener).toHaveBeenCalledTimes(1);

          unsubscribe();

          emitScreenshot();

          expect(listener).toHaveBeenCalledTimes(1);
        }
      )
    );

    it(
      'should invoke startScreenshotDetection once when add listeners',
      createIsolatedTest('android', ({ addScreenshotListener }) => {
        const { startScreenshotDetection } = NativeModules.Detector;

        addScreenshotListener(jest.fn());
        addScreenshotListener(jest.fn());
        addScreenshotListener(jest.fn());

        expect(startScreenshotDetection).toHaveBeenCalledTimes(1);
      })
    );

    it(
      'should invoke stopScreenshotDetection when no JS listeners',
      createIsolatedTest('android', ({ addScreenshotListener }) => {
        const { stopScreenshotDetection } = NativeModules.Detector;

        const unsubscribe1 = addScreenshotListener(jest.fn());
        const unsubscribe2 = addScreenshotListener(jest.fn());
        const unsubscribe3 = addScreenshotListener(jest.fn());

        unsubscribe1();

        expect(stopScreenshotDetection).toHaveBeenCalledTimes(0);

        unsubscribe2();

        expect(stopScreenshotDetection).toHaveBeenCalledTimes(0);

        unsubscribe3();

        expect(stopScreenshotDetection).toHaveBeenCalledTimes(1);
      })
    );

    it(
      'should restore screenshot detection when resubscribe',
      createIsolatedTest('android', ({ addScreenshotListener }) => {
        const { startScreenshotDetection } = NativeModules.Detector;

        const unsubscribe = addScreenshotListener(jest.fn());

        unsubscribe();

        expect(startScreenshotDetection).toHaveBeenCalledTimes(1);

        addScreenshotListener(jest.fn());

        expect(startScreenshotDetection).toHaveBeenCalledTimes(2);
      })
    );
  });
});
