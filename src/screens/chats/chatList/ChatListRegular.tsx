import {Box, useTheme} from 'native-base';
import React, {ReactElement, useCallback, useEffect} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {LayoutChangeEvent} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {Chat} from '../../../models/Chat';
import ChatListStub from './ChatListStub';
import ChatListItem from './ChatListItem';
import {ChatsThunks} from '../../../store/chats/chatsActions';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList from '../../../components/surfaces/FlatList';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';

const ChatListRegular = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const chats = useAppSelector(ChatsSelectors.chats);
  const [loading, setLoading] = useDelayedState();

  const load = async (): Promise<void> => {
    await dispatch(ChatsThunks.fetchChats(chats.length));
  };

  const refresh = async (): Promise<void> => {
    await dispatch(ChatsThunks.refreshChats());
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const keyExtractor = useCallback((chat: Chat): string => chat.id, []);
  const renderItem = useCallback(
    (chat: Chat, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.itemStyle(theme)}>
        <ChatListItem chat={chat} />
      </Box>
    ),
    [],
  );

  return (
    <ConditionalSpinner loading={loading}>
      <FlatList
        ListEmptyComponent={<ChatListStub />}
        data={chats}
        render={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={load}
        refresh={refresh}
      />
    </ConditionalSpinner>
  );
};

export default ChatListRegular;
