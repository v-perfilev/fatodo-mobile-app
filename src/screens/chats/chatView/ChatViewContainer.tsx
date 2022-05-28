import React, {ReactElement, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {ListRenderItemInfo, StyleProp, ViewStyle, VirtualizedList} from 'react-native';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ChatViewStub from './ChatViewStub';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import ChatViewItem from './ChatViewItem';
import ChatThunks from '../../../store/chat/chatThunks';
import {ChatItem} from '../../../models/ChatItem';
import {Theme, useTheme} from 'native-base';
import {DEFAULT_SPACE, HALF_DEFAULT_SPACE} from '../../../constants';

const containerStyle = (theme: Theme): StyleProp<ViewStyle> => ({
  padding: theme.sizes[DEFAULT_SPACE],
  paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
  paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
});

const ChatViewContainer = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [initialLoading, setInitialLoading] = useLoadingState();
  const chat = useAppSelector(ChatSelectors.chat);
  const chatItems = useAppSelector(ChatSelectors.chatItems);

  const loadMessages = (): void => {
    dispatch(ChatThunks.fetchMessages({chatId: chat.id, offset: chatItems.length}))
      .unwrap()
      .finally(() => setInitialLoading(false));
  };

  const showStub = useMemo<boolean>(() => chatItems.length === 0, [chatItems]);

  useEffect(() => {
    if (chat) {
      setInitialLoading(true);
      loadMessages();
    }
  }, [chat]);

  const renderItem = (info: ListRenderItemInfo<ChatItem>): ReactElement => (
    <ChatViewItem item={info.item} isVisible={false} />
  );
  const getItem = (items: ChatItem[], index: number): ChatItem => items[index];
  const getItemCount = (items: ChatItem[]): number => items.length;
  const keyExtractor = (item: ChatItem): string => item.message?.id || item.date;

  return (
    <ConditionalSpinner loading={initialLoading}>
      {showStub ? (
        <ChatViewStub />
      ) : (
        <VirtualizedList
          data={chatItems}
          renderItem={renderItem}
          getItem={getItem}
          getItemCount={getItemCount}
          keyExtractor={keyExtractor}
          onEndReached={loadMessages}
          onEndReachedThreshold={5}
          contentContainerStyle={containerStyle(theme)}
        />
      )}
    </ConditionalSpinner>
  );
};

export default ChatViewContainer;
