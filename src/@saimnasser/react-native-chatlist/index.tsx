import React, { type ForwardedRef, useImperativeHandle, useRef } from 'react';
import {
  FlatList,
  type ListRenderItem,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { KeyboardGestureArea } from 'react-native-keyboard-controller';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import { ChatBubble } from './components/chat-bubble';
import { useKeyboardAnimation } from './hooks';
import { styles } from './styles';
import type { TMessage } from './types';
import { Input } from './components/input';

type ReanimatedFlatListProps<T> = React.ComponentProps<
  typeof Reanimated.FlatList<T>
>;

type CustomFlatListProps<T> = Omit<
  ReanimatedFlatListProps<T>,
  'renderItem' | 'onEndReached' | 'onEndReachedThreshold' | 'data' | 'ref'
>;

export type ChatUIProps<T = TMessage> = {
  messages: T[];
  onSendPress?: (message: string) => void;
  renderMessage?: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  renderInput?: () => React.ReactNode;
  onTopReachedThreshold?: number;
  onTopReached?: () => void;
  ListEmptyComponent?: () => React.ReactNode;
  myMessageContainerStyle?: ViewStyle;
  otherContainerStyle?: ViewStyle;
  myMessageTextStyle?: TextStyle;
  otherMessageTextStyle?: TextStyle;
  myTimeTextStyle?: TextStyle;
  otherTimeTextStyle?: TextStyle;
  myNameTextStyle?: TextStyle;
  otherNameTextStyle?: TextStyle;
} & CustomFlatListProps<T>;

export type ChatUIRef = {
  scrollToTop: ({ animated }: { animated: boolean }) => void;
};

function ChatUIInner<T = TMessage>(
  {
    messages,
    onSendPress,
    renderMessage,
    keyExtractor,
    renderInput,
    onTopReachedThreshold,
    onTopReached,
    ListEmptyComponent,
    myMessageContainerStyle,
    otherContainerStyle,
    myMessageTextStyle,
    myTimeTextStyle,
    otherTimeTextStyle,
    otherMessageTextStyle,
    myNameTextStyle,
    otherNameTextStyle,
    ...flatListProps
  }: ChatUIProps<T>,
  ref: ForwardedRef<ChatUIRef>
) {
  const { height } = useKeyboardAnimation();
  const listRef = useRef<FlatList<T>>(null);

  const scrollViewStyle = useAnimatedStyle<ViewStyle>(
    () => ({
      flex: 1,
      transform: [{ translateY: -height.value }, ...styles.inverted.transform],
    }),
    []
  );

  const footerAnimatedStyle = useAnimatedStyle<ViewStyle>(() => ({
    transform: [{ translateY: -height.value }],
  }));

  const _renderMessage: ListRenderItem<T> = ({ item, index }) => (
    <View style={styles.inverted}>
      {renderMessage ? (
        renderMessage?.(item, index)
      ) : (
        <ChatBubble
          isMine={(item as TMessage).isMine}
          message={(item as TMessage).message}
          userImage={(item as TMessage).image}
          name={(item as TMessage).name}
          time={(item as TMessage).time}
          myMessageContainerStyle={myMessageContainerStyle}
          otherContainerStyle={otherContainerStyle}
          myMessageTextStyle={myMessageTextStyle}
          otherMessageTextStyle={otherMessageTextStyle}
          myTimeTextStyle={myTimeTextStyle}
          otherTimeTextStyle={otherTimeTextStyle}
          myNameTextStyle={myNameTextStyle}
          otherNameTextStyle={otherNameTextStyle}
        />
      )}
    </View>
  );

  useImperativeHandle(
    ref,
    () => ({
      scrollToTop: ({ animated }: { animated: boolean }) =>
        listRef.current?.scrollToEnd({ animated }),
    }),
    []
  );

  const _renderList = () => (
    <Reanimated.FlatList
      {...flatListProps}
      ref={listRef}
      data={messages}
      keyExtractor={keyExtractor}
      renderItem={_renderMessage}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="interactive"
      stickyHeaderHiddenOnScroll
      style={scrollViewStyle}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flexGrow}
      onEndReachedThreshold={onTopReachedThreshold}
      onEndReached={onTopReached}
      ListEmptyComponent={
        ListEmptyComponent ? (
          <View style={[styles.flex, styles.inverted]}>
            {ListEmptyComponent()}
          </View>
        ) : null
      }
    />
  );

  return (
    <View style={styles.container}>
      <KeyboardGestureArea
        interpolator="ios"
        offset={50}
        style={styles.flex}
        testID="chat.gesture"
      >
        {_renderList()}
      </KeyboardGestureArea>

      <Reanimated.View style={[styles.footerContainer, footerAnimatedStyle]}>
        {renderInput ? renderInput() : <Input onSendPress={onSendPress} />}
      </Reanimated.View>
    </View>
  );
}

// 👇 Export the component with generics and forwardRef

export const ChatUI = React.forwardRef(ChatUIInner) as <T = TMessage>(
  props: ChatUIProps<T> & { ref?: ForwardedRef<ChatUIRef> }
) => ReturnType<typeof ChatUIInner>;

export * from './components/chat-bubble';
export * from './components/input';
