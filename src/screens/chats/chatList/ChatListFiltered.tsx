import React, {ReactElement, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {FlatList, ListRenderItemInfo} from 'react-native';
import ChatListStub from './ChatListStub';
import ChatsThunks from '../../../store/chats/chatsThunks';
import {Chat} from '../../../models/Chat';
import ChatListItem from './ChatListItem';

type ChatListFilteredProps = {
  filter: string;
};

const ChatListFiltered = ({filter}: ChatListFilteredProps) => {
  const dispatch = useAppDispatch();
  const filteredChats = useAppSelector(ChatsSelectors.filteredChats);
  const [loading, setLoading] = useLoadingState();

  const loadFilteredChats = (): void => {
    dispatch(ChatsThunks.fetchFilteredChats(filter))
      .unwrap()
      .finally(() => setLoading(false));
  };

  const showStub = useMemo<boolean>(() => filteredChats.length === 0, [filteredChats]);

  useEffect(() => {
    setLoading(true);
    loadFilteredChats();
  }, [filter]);

  const renderItem = (info: ListRenderItemInfo<Chat>): ReactElement => <ChatListItem chat={info.item} />;

  return (
    <ConditionalSpinner loading={loading}>
      {showStub ? <ChatListStub /> : <FlatList data={filteredChats} renderItem={renderItem} />}
    </ConditionalSpinner>
  );
};

export default ChatListFiltered;
