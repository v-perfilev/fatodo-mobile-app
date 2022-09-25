import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {User} from '../../../../models/User';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import ModalDialog from '../../../../components/modals/ModalDialog';
import {Text} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import ChatMessageReactionsDialogItem from './ChatMessageReactionsDialogItem';
import {Message, MessageReaction} from '../../../../models/Message';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';

type MessageReactionWithUser = {
  reaction: MessageReaction;
  user?: User;
};

export type ChatMessageReactionsDialogProps = {
  message: Message;
  show: boolean;
  close: () => void;
};

export const defaultChatMessageReactionsDialogProps: Readonly<ChatMessageReactionsDialogProps> = {
  message: null,
  show: false,
  close: (): void => null,
};

const ChatMessageReactionsDialog = ({message, show, close}: ChatMessageReactionsDialogProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const reactionUserIds = useMemo(() => message?.reactions.map((r) => r.userId), [message]);
  const users = useAppSelector((state) => usersSelector(state, reactionUserIds));
  const {t} = useTranslation();
  const [reactions, setReactions] = useState<MessageReactionWithUser[]>([]);
  const [reactionsToShow, setReactionsToShow] = useState<MessageReactionWithUser[]>([]);

  const filterReactionsToShow = (text: string): void => {
    const updatedList = reactions.filter((reaction) => reaction.user?.username?.includes(text));
    setReactionsToShow(updatedList);
  };

  const combineUsersWithReactions = (): void => {
    const updatedList = message.reactions.map((reaction) => ({
      reaction,
      user: users.find((u) => u.id === reaction.userId),
    }));
    setReactions(updatedList);
    setReactionsToShow(updatedList);
  };

  useEffect(() => {
    if (message && users) {
      combineUsersWithReactions();
    }
  }, [message?.reactions, users]);

  const content = (
    <FVStack defaultSpace>
      <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={filterReactionsToShow} />
      {reactionsToShow.length > 0 && (
        <FVStack defaultSpace>
          {reactionsToShow.map((reaction) => (
            <ChatMessageReactionsDialogItem reaction={reaction.reaction} user={reaction.user} key={reaction.user.id} />
          ))}
        </FVStack>
      )}
      {reactions.length === 0 && (
        <FCenter>
          <Text color="gray.400">{t('chat:reactions.reactionsNotFound')}</Text>
        </FCenter>
      )}
    </FVStack>
  );

  return <ModalDialog open={show} close={close} title={t('chat:reactions.title')} content={content} />;
};

export default ChatMessageReactionsDialog;
