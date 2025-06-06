import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { height } from '../methods';

export interface InputProps {
  onChangeText?: (text: string) => void;
  onSendPress?: (message: string) => void;
}

export const Input = ({ onSendPress = () => {} }: InputProps) => {
  const [message, setMessage] = useState<string>('');
  return (
    <>
      <TextInput
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={styles.input}
        placeholder="Type your message..."
        placeholderTextColor={'#9A9A9A'}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          onSendPress(message);
          setMessage(''); // Clear the input after sending
        }}>
        <View style={styles.sendButton}>
          <Text style={styles.whiteText}>Send</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  sendBtn: { color: 'white' },
  floatingBtn: {
    backgroundColor: 'teal',
    paddingVertical: 0,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#F2F2F2',
    color: 'black',
    width: '80%',
    borderRadius: 12,
    height: height(5),
    paddingHorizontal: 8,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  sendButton: {
    backgroundColor: '#F2F2F2',
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingVertical: 0,
    height: height(5),
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: { color: 'black', fontWeight: 'bold' },
});
