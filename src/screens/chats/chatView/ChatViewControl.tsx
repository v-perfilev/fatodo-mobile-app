import React, {useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import FHStack from '../../../components/boxes/FHStack';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FBox from '../../../components/boxes/FBox';
import SendMessageIcon from '../../../components/icons/SendMessageIcon';
import {MessageDTO} from '../../../models/dto/MessageDTO';
import IconButton from '../../../components/controls/IconButton';
import {useTranslation} from 'react-i18next';
import {ChatThunks} from '../../../store/chat/chatActions';
import ChatSelectors from '../../../store/chat/chatSelectors';

const ChatViewControl = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const chat = useAppSelector(ChatSelectors.chat);
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
        <ClearableTextInput
          h="36px"
          px="2"
          variant="unstyled"
          placeholder={t('chat:view.inputPlaceholder')}
          value={updater}
          onChangeText={handleTextChange}
        />
      </FBox>
      <IconButton icon={<SendMessageIcon />} onPress={handleSend} isDisabled={!isValid} />
    </FHStack>
  );
};

export default ChatViewControl;
