
# react-native-chatlist
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform: iOS / Android](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue.svg)](https://reactnative.dev)

<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="./gifs/android.gif" alt="Android Demo" width="300" />
  <img src="./gifs/ios.gif" alt="IOS Demo" width="300" />
</div>
A flexible, animated, and customizable Chat UI component for React Native.  
Built on top of `react-native-reanimated` and `react-native-keyboard-controller`.

---

## ✨ Features

✅ Animated keyboard gestures
✅ Flexible message rendering  
✅ Built-in simple input component  
✅ Infinite scroll (top reach detection)  
✅ Type-safe message array with generic support  
✅ Easy to use with default message type or your own message type  

---

## 📦 Requirements

- `react-native-reanimated` >= **3.x**
- `react-native-keyboard-controller` (latest version)

---

## 🛠 Installation

```bash
npm install react-native-chatlist react-native-reanimated react-native-keyboard-controller
````

### Additional Setup

* Make sure to configure [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)
  

* Configure [react-native-keyboard-controller](https://github.com/kirillzyusko/react-native-keyboard-controller#installation)
  

---

## 💻 Usage

### Basic Example (using default message type)

```tsx
import React, { useRef } from 'react';
import { ChatUI, type ChatUIRef, type TMessage } from 'react-native-chatlist';

const messages: TMessage[] = [
  {
    id: '1',
    message: 'Hello!',
    name: 'Alice',
    time: '10:00 AM',
    isMine: false,
  },
  {
    id: '2',
    message: 'Hi there!',
    name: 'You',
    time: '10:01 AM',
    isMine: true,
  },
];

export default function App() {
  const chatRef = useRef<ChatUIRef>(null);

  const handleSend = (newMessage: string) => {
    console.log('Send:', newMessage);
    // Add your logic to append the message to `messages`
  };

  return (
    <ChatUI
      ref={chatRef}
      messages={messages}
      onSendPress={handleSend}
      keyExtractor={(item) => item.id}
    />
  );
}
```

---

## ⚙️ Custom Message Type

The component is **generic** — it accepts a type parameter `T`.

👉 If you do **not** provide a type parameter, it will use this default `TMessage`:

```ts
export type TMessage = {
  id: string;
  message: string;
  name: string;
  time: string;
  image?: string;
  isMine: boolean;
};
```

👉 If you want to use your own message shape, pass it as a type parameter:

```tsx
type CustomMessage = {
  id: string;
  message: string;
  name: string;
  time: string;
  avatarUrl?: string;
  isMine: boolean;
};

const messages: CustomMessage[] = [
  // your messages
];

<ChatUI<CustomMessage>
  messages={messages}
  keyExtractor={(item) => item.id}
  renderMessage={(item) => (
    <CustomChatBubble item={item} />
  )}
/>;
```

### Summary:

| Usage                             | Behavior                         |
| --------------------------------- | -------------------------------- |
| `<ChatUI ... />`                  | Uses `TMessage`                  |
| `<ChatUI<MyCustomMessage> ... />` | Uses your type `MyCustomMessage` |

---

## 🔠 Props

| Prop                       | Type                                      | Default      | Description                                    |
| -------------------------- | ----------------------------------------- | ------------ | ---------------------------------------------- |
| `messages`                 | `T[]` (defaults to `TMessage[]`)          | **required** | Array of message objects                       |
| `keyExtractor`             | `(item: T, index: number) => string`      | **required** | Function to extract unique key from messages   |
| `onSendPress`              | `(message: string) => void`               | optional     | Called when user presses Send                  |
| `renderMessage`            | `(item: T, index: number) => ReactNode`   | optional     | Custom render function for messages            |
| `renderInput`              | `() => ReactNode`                         | optional     | Custom input component                         |
| `onTopReachedThreshold`    | `number`                                  | optional     | Threshold to trigger `onTopReached`            |
| `onTopReached`             | `() => void`                              | optional     | Called when top of chat is reached             |
| `ListEmptyComponent`       | `() => ReactNode`                         | optional     | Component to show when messages array is empty |
| `myMessageContainerStyle`  | `ViewStyle`                               | optional     | Style for "my" message container               |
| `otherContainerStyle`      | `ViewStyle`                               | optional     | Style for "other" message container            |
| `myMessageTextStyle`       | `TextStyle`                               | optional     | Style for "my" message text                    |
| `otherMessageTextStyle`    | `TextStyle`                               | optional     | Style for "other" message text                 |
| `myTimeTextStyle`          | `TextStyle`                               | optional     | Style for "my" message time                    |
| `otherTimeTextStyle`       | `TextStyle`                               | optional     | Style for "other" message time                 |
| `myNameTextStyle`          | `TextStyle`                               | optional     | Style for "my" message name                    |
| `otherNameTextStyle`       | `TextStyle`                               | optional     | Style for "other" message name                 |
| *All other FlatList props* | Supported via spread (`...FlatListProps`) |              | You can pass standard `FlatList` props         |

---

## 🧭 Ref API

You can use `ref` to control scrolling:

```ts
type ChatUIRef = {
  scrollToTop: ({ animated }: { animated: boolean }) => void;
};
```

Example usage:

```tsx
chatRef.current?.scrollToTop({ animated: true });
```

---

## 📦 Components Exported

```ts
import { ChatBubble, Input } from 'react-native-chatlist';
```

* `ChatBubble` — the default message bubble component
* `Input` — the default input component used if `renderInput` is not provided


## 📝 License

MIT
