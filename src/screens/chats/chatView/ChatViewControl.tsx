import React, {memo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import FHStack from '../../../components/boxes/FHStack';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FBox from '../../../components/boxes/FBox';
import SendMessageIcon from '../../../components/icons/SendMessageIcon';
import {MessageDTO} from '../../../models/dto/MessageDTO';
import IconButton from '../../../components/controls/IconButton';
import {useTranslation} from 'react-i18next';
import {ChatActions} from '../../../store/chat/chatActions';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {CHATS_INPUT_HEIGHT} from '../../../constants';

const ChatViewControl = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const chat = useAppSelector(ChatSelectors.chat);
  const [messageBody, setMessageBody] = useState<string>('');
  const [updater, setUpdater] = useState<string>(undefined);

  const isValid = messageBody.length > 0;

  const handleTextChange = (text: string): void => {
    const trimmedText = text?.trim() || '';
    setMessageBody(trimmedText);
    setUpdater(undefined);
  };

  const handleSend = (): void => {
    const dto: MessageDTO = {text: messageBody, referenceId: null};
    dispatch(ChatActions.sendMessageThunk({chatId: chat.id, dto}));
    setMessageBody('');
    setUpdater('');
  };

  return (
    <FHStack
      position="absolute"
      zIndex="200"
      w="100%"
      h={CHATS_INPUT_HEIGHT}
      bottom="0"
      p="2"
      alignItems="center"
      borderTopWidth="1"
      borderTopColor="gray.200"
      bgColor="white"
    >
      <FBox px="2">
        <ClearableTextInput
          h="36px"
          p="0"
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

export default memo(ChatViewControl);
