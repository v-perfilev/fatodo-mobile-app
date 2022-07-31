import * as React from 'react';
import {ComponentType, useCallback, useEffect, useMemo} from 'react';
import {useWsContext} from '../../contexts/WsContext';
import {ClearEvent} from '../../../models/ClearEvent';
import {useAppDispatch} from '../../../store/store';
import {ChatsActions} from '../../../store/chats/chatsActions';
import {GroupsActions} from '../../../store/groups/groupsActions';
import {GroupActions} from '../../../store/group/groupActions';
import {ContactsActions} from '../../../store/contacts/contactsActions';

enum WsClearDestinations {
  CLEAR = '/user/clear',
}

const withWsClear = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const {setTopicsAndHandler, removeTopicsAndHandler} = useWsContext();

  const handler = useCallback((msg: any, topic: string): void => {
    if (topic.startsWith(WsClearDestinations.CLEAR)) {
      const clearEvent = msg as ClearEvent;
      switch (clearEvent.type) {
        case 'GROUP':
          dispatch(GroupsActions.removeGroup(clearEvent.id));
          break;
        case 'ITEM':
          dispatch(GroupsActions.removeItem(clearEvent.id));
          dispatch(GroupActions.removeItem(clearEvent.id));
          break;
        case 'CONTACT':
          dispatch(ContactsActions.removeRelation(clearEvent.id));
          break;
        case 'INCOMING_REQUEST':
          dispatch(ContactsActions.removeIncomingRequest(clearEvent.id));
          break;
        case 'OUTCOMING_REQUEST':
          dispatch(ContactsActions.removeOutcomingRequest(clearEvent.id));
          break;
        case 'CHAT':
          dispatch(ChatsActions.removeChat(clearEvent.id));
          break;
      }
    }
  }, []);

  const topics = useMemo<string[]>(() => {
    return [WsClearDestinations.CLEAR];
  }, []);

  useEffect(() => {
    setTopicsAndHandler('WS_CLEAR', {topics, handler});
    return (): void => removeTopicsAndHandler('WS_CLEAR');
  }, []);

  return <Component {...props} />;
};

export default withWsClear;
