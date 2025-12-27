import { useKeyboardHandler } from 'react-native-keyboard-controller';
import { useSharedValue, withTiming } from 'react-native-reanimated';

const TIMING_CONFIG = { duration: 280 };

export const useKeyboardAnimation = () => {
  const height = useSharedValue(0);
  const progress = useSharedValue(0);
  const isInteractive = useSharedValue(false);

  useKeyboardHandler({
    onStart: () => {
      'worklet';
      isInteractive.value = false;
    },

    onInteractive: (e) => {
      'worklet';
      isInteractive.value = true;
      height.value = e.height;
      progress.value = e.progress;
    },

    onMove: (e) => {
      'worklet';
      // Some platforms fire onMove instead of onInteractive
      isInteractive.value = true;
      height.value = e.height;
      progress.value = e.progress;
    },

    onEnd: (e) => {
      'worklet';
      isInteractive.value = false;

      // iOS open/close often jumps directly to end → animate it
      height.value = withTiming(e.height, TIMING_CONFIG);
      progress.value = withTiming(e.progress, TIMING_CONFIG);
    },
  });

  return {
    height,
    progress,
    isInteractive,
  };
};
