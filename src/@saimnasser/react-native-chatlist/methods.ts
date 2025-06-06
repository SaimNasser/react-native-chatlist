import { Dimensions } from 'react-native'

const fullWidth = Dimensions.get('window').width
const fullHeight = Dimensions.get('window').height

export const width = (number: number) => {
    if (number >= 100) return fullWidth
    else if (number <= 0) return 0
    else return fullWidth * (number / 100)
}

export const height = (number: number) => {
    if (number >= 100) return fullHeight
    else if (number <= 0) return 0
    else return fullHeight * (number / 100)
}
