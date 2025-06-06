import { useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ChatUI, type ChatUIRef } from '@saimnasser/react-native-chatlist';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import type { TMessage } from '../../src/@saimnasser/react-native-chatlist/types';
import { dummy_messages } from './data';
import { styles } from './styles';

export default function App() {
  const chatListRef = useRef<ChatUIRef | null>(null);
  const [messages, setMessages] = useState<TMessage[]>(dummy_messages);

  const onSendPress = (message: string) => {
    console.log('Message Sent', message);
    if (message.trim() === '') return;
    const newMessage: TMessage = {
      id: String(messages.length + 1),
      message,
      name: 'User',
      time: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),

      isMine: true,
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };
  return (
    <>
      <SafeAreaView />
      <KeyboardProvider>
        <View style={styles.container}>
          <ChatUI
            ref={chatListRef}
            messages={messages}
            keyExtractor={(item) => item.id}
            onSendPress={onSendPress}
          />
        </View>
      </KeyboardProvider>
    </>
  );
}
