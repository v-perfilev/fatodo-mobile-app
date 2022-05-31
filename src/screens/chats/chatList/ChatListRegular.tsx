import {FlatList, useTheme} from 'native-base';
import React, {ReactElement, useCallback, useEffect} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {ListRenderItemInfo} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {Chat} from '../../../models/Chat';
import ChatListStub from './ChatListStub';
import ChatListItem from './ChatListItem';
import {ChatsThunks} from '../../../store/chats/chatsActions';
import {ListUtils} from '../../../shared/utils/ListUtils';

const ChatListRegular = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [loading, setLoading] = useDelayedState();
  const chats = useAppSelector(ChatsSelectors.chats);

  const loadChats = (): void => {
    dispatch(ChatsThunks.fetchChats(chats.length))
      .unwrap()
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    loadChats();
  }, []);

  const keyExtractor = useCallback((chat: Chat): string => chat.id, []);
  const renderItem = useCallback((info: ListRenderItemInfo<Chat>): ReactElement => {
    return <ChatListItem chat={info.item} style={ListUtils.itemStyle(theme)} />;
  }, []);

  return (
    <ConditionalSpinner loading={loading}>
      <FlatList
        ListEmptyComponent={<ChatListStub />}
        data={chats}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={loadChats}
        onEndReachedThreshold={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ListUtils.containerStyle(theme)}
      />
    </ConditionalSpinner>
  );
};

export default ChatListRegular;
