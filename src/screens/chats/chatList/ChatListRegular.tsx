import {FlatList} from 'native-base';
import React, {ReactElement, useEffect, useMemo} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import {ListRenderItemInfo} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsThunks from '../../../store/chats/chatsThunks';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {Chat} from '../../../models/Chat';
import ChatListItem from './ChatListItem';
import ChatListStub from './ChatListStub';

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

  const showStub = useMemo<boolean>(() => chats.length === 0, [chats]);

  useEffect(() => {
    setInitialLoading(true);
    loadChats();
  }, []);

  const renderItem = (info: ListRenderItemInfo<Chat>): ReactElement => <ChatListItem chat={info.item} />;

  return (
    <ConditionalSpinner loading={initialLoading}>
      {showStub ? (
        <ChatListStub />
      ) : (
        <FlatList data={chats} onEndReached={loadChats} onEndReachedThreshold={5} renderItem={renderItem} />
      )}
    </ConditionalSpinner>
  );
};

export default ChatListRegular;
