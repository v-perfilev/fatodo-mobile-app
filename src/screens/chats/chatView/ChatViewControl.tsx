import React, {memo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import FHStack from '../../../components/boxes/FHStack';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FBox from '../../../components/boxes/FBox';
import SendMessageIcon from '../../../components/icons/SendMessageIcon';
import {MessageDTO} from '../../../models/dto/MessageDTO';
import {useTranslation} from 'react-i18next';
import {ChatActions} from '../../../store/chat/chatActions';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {CHATS_INPUT_HEIGHT} from '../../../constants';
import {Box, useColorModeValue} from 'native-base';
import {DARK_BG, LIGHT_BG} from '../../../shared/themes/colors';
import IconButton from '../../../components/controls/IconButton';

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
    const dto: MessageDTO = {text: messageBody};
    dispatch(ChatActions.sendMessageThunk({chatId: chat.id, dto}));
    setMessageBody('');
    setUpdater('');
  };

  const bg = useColorModeValue(LIGHT_BG, DARK_BG);
  const borderBg = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <FHStack
        position="absolute"
        zIndex="200"
        w="100%"
        h={CHATS_INPUT_HEIGHT}
        bottom="0"
        p="2"
        alignItems="center"
        borderTopWidth="1"
        borderTopColor={borderBg}
        bgColor={bg}
      >
        <FBox px="2">
          <ClearableTextInput
            h="36px"
            p="0"
            variant="unstyled"
            placeholder={t('chat:view.inputPlaceholder')}
            placeholderTextColor="gray.400"
            value={updater}
            onChangeText={handleTextChange}
          />
        </FBox>
        <IconButton
          size="lg"
          p="2"
          icon={<SendMessageIcon />}
          onPress={handleSend}
          isDisabled={!isValid}
          disabled={!isValid}
        />
      </FHStack>
      <Box position="absolute" zIndex="200" w="100%" bottom="0" height="1000" mb="-1000" bgColor={bg} />
    </>
  );
};

export default memo(ChatViewControl);
