import {FlatList, Theme, useTheme} from 'native-base';
import React, {ReactElement, useCallback, useEffect, useMemo} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {Chat} from '../../../models/Chat';
import ChatListStub from './ChatListStub';
import {DEFAULT_SPACE, HALF_DEFAULT_SPACE} from '../../../constants';
import ChatListItem from './ChatListItem';
import {ChatsThunks} from '../../../store/chats/chatsActions';

const containerStyle = (theme: Theme): StyleProp<ViewStyle> => ({
  padding: theme.sizes[DEFAULT_SPACE],
  paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
  paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
});

const ChatListRegular = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [initialLoading, setInitialLoading] = useDelayedState();
  const chats = useAppSelector(ChatsSelectors.chats);

  const showStub = useMemo<boolean>(() => chats.length === 0, [chats]);

  const loadChats = (): void => {
    dispatch(ChatsThunks.fetchChats(chats.length))
      .unwrap()
      .finally(() => setInitialLoading(false));
  };

  useEffect(() => {
    setInitialLoading(true);
    loadChats();
  }, []);

  const keyExtractor = useCallback((chat: Chat): string => chat.id, []);
  const renderItem = useCallback((info: ListRenderItemInfo<Chat>): ReactElement => {
    return <ChatListItem chat={info.item} />;
  }, []);

  return (
    <ConditionalSpinner loading={initialLoading}>
      {showStub ? (
        <ChatListStub />
      ) : (
        <FlatList
          data={chats}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={loadChats}
          onEndReachedThreshold={5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={containerStyle(theme)}
        />
      )}
    </ConditionalSpinner>
  );
};

export default ChatListRegular;
