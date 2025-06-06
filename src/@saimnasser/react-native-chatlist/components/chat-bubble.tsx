import { Image, StyleSheet, Text, type TextStyle, View, type ViewStyle } from 'react-native'

export interface ChatBubbleProps {
    isMine: boolean
    message: string
    userImage?: string
    name?: string
    time?: string
    myMessageContainerStyle?: ViewStyle
    otherContainerStyle?: ViewStyle
    myMessageTextStyle?: TextStyle
    otherMessageTextStyle?: TextStyle
    myTimeTextStyle?: TextStyle
    otherTimeTextStyle?: TextStyle
    myNameTextStyle?: TextStyle
    otherNameTextStyle?: TextStyle
}

export const ChatBubble = ({
    isMine,
    message,
    userImage,
    name,
    time,
    myMessageContainerStyle = {},
    otherContainerStyle = {},
    myMessageTextStyle = {},
    otherMessageTextStyle = {},
    myTimeTextStyle = {},
    otherTimeTextStyle = {},
    myNameTextStyle = {},
    otherNameTextStyle = {},
}: ChatBubbleProps) => {
    if (isMine) {
        return (
            <View style={[styles.userMessageContainer, myMessageContainerStyle]}>
                {userImage && userImage !== '' && (
                    <Image source={{ uri: userImage }} style={styles.avatar} />
                )}
                <View style={styles.innerContainer}>
                    {name && <Text style={[styles.name, myNameTextStyle]}>{name}</Text>}
                    <Text style={[styles.message, myMessageTextStyle]}>{message}</Text>
                    {time && time !== '' && (
                        <Text style={[styles.timestamp, myTimeTextStyle]}>{time}</Text>
                    )}
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.otherMessageContainer, otherContainerStyle]}>
            {userImage && userImage !== '' && (
                <Image source={{ uri: userImage }} style={styles.avatar} />
            )}
            <View style={styles.innerContainer}>
                {name && <Text style={[styles.name, otherNameTextStyle]}>{name}</Text>}
                <Text style={[styles.message, otherMessageTextStyle]}>{message}</Text>
                {time && time !== '' && (
                    <Text style={[styles.timestamp, otherTimeTextStyle]}>{time}</Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userMessageContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        margin: 8,
        maxWidth: '85%',
        backgroundColor: '#121212',
        borderRadius: 16,
        borderBottomRightRadius: 0,
        padding: 10,
    },
    otherMessageContainer: {
        flexDirection: 'row',
        margin: 8,
        alignSelf: 'flex-start',
        maxWidth: '85%',
        backgroundColor: '#505050',
        borderRadius: 16,
        borderBottomLeftRadius: 0,
        padding: 10,
    },
    innerContainer: {
        minWidth: '35%',
        marginLeft: 4,
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    message: {
        color: '#fff',
        fontSize: 16,
        marginTop: 4
    },
    timestamp: {
        fontSize: 10,
        color: '#fff',
        alignSelf: 'flex-end',
        marginTop: 4,
        fontWeight: 'bold'
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#000',
    },
})
