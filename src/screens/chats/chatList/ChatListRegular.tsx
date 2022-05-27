import {FlatList} from 'native-base';
import React, {ReactElement, useEffect} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import {ListRenderItemInfo} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsThunks from '../../../store/chats/chatsThunks';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {Chat} from '../../../models/Chat';
import ChatListItem from './ChatListItem';

type ChatListRegularProps = {};

const ChatListRegular = ({}: ChatListRegularProps) => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(ChatsSelectors.chats);
  const [initialLoading, setInitialLoading] = useLoadingState();

  const loadChats = (): void => {
    dispatch(ChatsThunks.fetchChats(chats.length))
      .unwrap()
      .finally(() => setInitialLoading(false));
  };

  useEffect(() => {
    loadChats();
  }, []);

  const renderItem = (info: ListRenderItemInfo<Chat>): ReactElement => <ChatListItem chat={info.item} />;

  return (
    <ConditionalSpinner loading={initialLoading}>
      <FlatList data={chats} onEndReached={loadChats} onEndReachedThreshold={5} renderItem={renderItem} />
    </ConditionalSpinner>
  );
};

export default ChatListRegular;
