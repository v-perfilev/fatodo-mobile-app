import {Theme, useTheme} from 'native-base';
import React, {ReactElement, useEffect, useMemo} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import {ListRenderItemInfo, StyleProp, ViewStyle, VirtualizedList} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsThunks from '../../../store/chats/chatsThunks';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {Chat} from '../../../models/Chat';
import ChatListStub from './ChatListStub';
import {DEFAULT_SPACE, HALF_DEFAULT_SPACE} from '../../../constants';
import ChatListItem from './ChatListItem';

const containerStyle = (theme: Theme): StyleProp<ViewStyle> => ({
  padding: theme.sizes[DEFAULT_SPACE],
  paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
  paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
});

const ChatListRegular = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [initialLoading, setInitialLoading] = useLoadingState();
  const chats = useAppSelector(ChatsSelectors.chats);

  const loadChats = (): void => {
    dispatch(ChatsThunks.fetchChats(chats.length))
      .unwrap()
      .finally(() => setInitialLoading(false));
  };

  const showStub = useMemo<boolean>(() => chats.length === 0, [chats]);

  useEffect(() => {
    setInitialLoading(true);
    loadChats();
  }, []);

  const renderItem = (info: ListRenderItemInfo<Chat>): ReactElement => <ChatListItem chat={info.item} />;
  const getItem = (chats: Chat[], index: number): Chat => chats[index];
  const getItemCount = (chats: Chat[]): number => chats.length;
  const keyExtractor = (chat: Chat): string => chat.id;

  return (
    <ConditionalSpinner loading={initialLoading}>
      {showStub ? (
        <ChatListStub />
      ) : (
        <VirtualizedList
          data={chats}
          renderItem={renderItem}
          getItem={getItem}
          getItemCount={getItemCount}
          keyExtractor={keyExtractor}
          onEndReached={loadChats}
          onEndReachedThreshold={5}
          contentContainerStyle={containerStyle(theme)}
        />
      )}
    </ConditionalSpinner>
  );
};

export default ChatListRegular;
