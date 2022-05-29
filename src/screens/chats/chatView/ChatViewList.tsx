import React, {memo, MutableRefObject, ReactElement, useCallback} from 'react';
import {useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
  ViewToken,
  VirtualizedList,
} from 'react-native';
import ChatViewItem from './ChatViewItem';
import {ChatItem} from '../../../models/ChatItem';
import {Box, FlatList, Theme, useTheme} from 'native-base';
import {DEFAULT_SPACE, HALF_DEFAULT_SPACE} from '../../../constants';

const invertedStyle = {
  scaleY: -1,
} as StyleProp<ViewStyle>;

const containerStyle = (theme: Theme): StyleProp<ViewStyle> => ({
  padding: theme.sizes[DEFAULT_SPACE],
  paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
  paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
});

type ChatViewListProps = {
  loadMessages: () => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onViewableItemsChanged: (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => void;
  listRef: MutableRefObject<VirtualizedList<ChatItem>>;
};

const ChatViewList = ({loadMessages, onScroll, onViewableItemsChanged, listRef}: ChatViewListProps) => {
  const theme = useTheme();
  const chatItems = useAppSelector(ChatSelectors.chatItems);

  const keyExtractor = useCallback((item: ChatItem): string => item.message?.id || item.date, []);
  const renderItem = useCallback((info: ListRenderItemInfo<ChatItem>): ReactElement => {
    return (
      <Box style={invertedStyle}>
        <ChatViewItem item={info.item} />
      </Box>
    );
  }, []);

  return (
    <FlatList
      style={invertedStyle}
      data={chatItems}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={loadMessages}
      onEndReachedThreshold={5}
      onViewableItemsChanged={onViewableItemsChanged}
      onScroll={onScroll}
      showsVerticalScrollIndicator={false}
      ref={listRef}
      contentContainerStyle={containerStyle(theme)}
    />
  );
};

export default memo(ChatViewList);
