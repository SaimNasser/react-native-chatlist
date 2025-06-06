import { useKeyboardHandler } from 'react-native-keyboard-controller'
import { useSharedValue } from 'react-native-reanimated'

export const useKeyboardAnimation = () => {
    const progress = useSharedValue(0)
    const height = useSharedValue(0)

    useKeyboardHandler({
        onMove: (e) => {
            'worklet'

            progress.value = e.progress
            height.value = e.height
        },
        onInteractive: (e) => {
            'worklet'

            progress.value = e.progress
            height.value = e.height
        },
    })

    return { height, progress }
}
