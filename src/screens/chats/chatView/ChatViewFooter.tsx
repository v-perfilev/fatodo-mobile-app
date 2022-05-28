import React, {useMemo, useState} from 'react';
import {useAppDispatch} from '../../../store/store';
import FHStack from '../../../components/boxes/FHStack';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FBox from '../../../components/boxes/FBox';
import IconButton from '../../../components/controls/IconButton';
import SendMessageIcon from '../../../components/icons/SendMessageIcon';
import {MessageDTO} from '../../../models/dto/MessageDTO';
import ChatThunks from '../../../store/chat/chatThunks';
import {Chat} from '../../../models/Chat';

type ChatViewFooterProps = {
  chat: Chat;
};

const ChatViewFooter = ({chat}: ChatViewFooterProps) => {
  const dispatch = useAppDispatch();
  const [messageBody, setMessageBody] = useState<string>('');
  const [updater, setUpdater] = useState<string>(undefined);

  const isValid = useMemo<boolean>(() => messageBody.length > 0, [messageBody]);

  const dto = useMemo<MessageDTO>(
    () => ({
      text: messageBody,
      forwardedMessageId: null,
    }),
    [messageBody],
  );

  const handleTextChange = (text: string): void => {
    const trimmedText = text?.trim() || '';
    setMessageBody(trimmedText);
    setUpdater(undefined);
  };

  const handleSend = (): void => {
    setMessageBody('');
    setUpdater('');
    dispatch(ChatThunks.sendMessage({chatId: chat.id, dto}));
  };

  return (
    <FHStack space="2" p="2" alignItems="center" borderTopWidth="1" borderTopColor="gray.200">
      <FBox>
        <ClearableTextInput h="36px" px="2" variant="unstyled" value={updater} onChangeText={handleTextChange} />
      </FBox>
      <IconButton icon={<SendMessageIcon />} onPress={handleSend} isDisabled={!isValid} />
    </FHStack>
  );
};

export default ChatViewFooter;
