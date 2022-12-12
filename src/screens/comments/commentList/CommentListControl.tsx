import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import FHStack from '../../../components/boxes/FHStack';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import {useTranslation} from 'react-i18next';
import {CommentDTO} from '../../../models/dto/CommentDTO';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import FVStack from '../../../components/boxes/FVStack';
import {COMMENTS_INPUT_HEIGHT} from '../../../constants';
import SendMessageIcon from '../../../components/icons/SendMessageIcon';
import {CommentsActions} from '../../../store/comments/commentsActions';
import {Box, useColorModeValue} from 'native-base';
import {DARK_BG, LIGHT_BG} from '../../../shared/themes/colors';
import IconButton from '../../../components/controls/IconButton';

const CommentListControl = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const [messageBody, setMessageBody] = useState<string>('');
  const [updater, setUpdater] = useState<string>(undefined);

  const isValid = messageBody.length > 0;

  const dto: CommentDTO = {
    text: messageBody,
  };

  const handleTextChange = (text: string): void => {
    const trimmedText = text?.trim() || '';
    setMessageBody(trimmedText);
    setUpdater(undefined);
  };

  const handleSend = (): void => {
    setMessageBody('');
    setUpdater('');
    dispatch(CommentsActions.sendCommentThunk({targetId, dto}));
  };

  const bg = useColorModeValue(LIGHT_BG, DARK_BG);
  const borderBg = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <FHStack
        position="absolute"
        zIndex="200"
        width="100%"
        height={COMMENTS_INPUT_HEIGHT}
        bottom="0"
        space="2"
        px="2"
        alignItems="center"
        borderTopWidth="1"
        borderTopColor={borderBg}
        bgColor={bg}
      >
        <FVStack grow px="2">
          <ClearableTextInput
            minHeight="0"
            p="0"
            variant="unstyled"
            placeholderTextColor="gray.400"
            placeholder={t('comment:list.inputPlaceholder')}
            value={updater}
            onChangeText={handleTextChange}
          />
        </FVStack>
        <IconButton
          size="lg"
          p="2"
          icon={<SendMessageIcon />}
          onPress={handleSend}
          disabled={!isValid}
          isDisabled={!isValid}
        />
      </FHStack>
      <Box position="absolute" zIndex="200" w="100%" bottom="0" height="1000" mb="-1000" bgColor={bg} />
    </>
  );
};

export default CommentListControl;
