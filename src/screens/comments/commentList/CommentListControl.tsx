import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import FHStack from '../../../components/boxes/FHStack';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import SendMessageIcon from '../../../components/icons/SendMessageIcon';
import IconButton from '../../../components/controls/IconButton';
import {useTranslation} from 'react-i18next';
import {CommentDTO} from '../../../models/dto/CommentDTO';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';
import {Comment} from '../../../models/Comment';
import FVStack from '../../../components/boxes/FVStack';
import CommentListControlReference from './CommentListControlReference';

type CommentsViewControlProps = {
  reference: Comment;
  clearReference: () => void;
};

const CommentListControl = ({reference, clearReference}: CommentsViewControlProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const [messageBody, setMessageBody] = useState<string>('');
  const [updater, setUpdater] = useState<string>(undefined);

  const isValid = messageBody.length > 0;

  const dto: CommentDTO = {
    text: messageBody,
    referenceId: reference?.id,
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

  return (
    <FHStack
      zIndex="1"
      h="50px"
      space="2"
      px="2"
      py={reference ? 1 : 2}
      alignItems="center"
      bgColor="white"
      borderTopWidth="1"
      borderTopColor="gray.200"
    >
      <FVStack grow px="2" pb={reference ? 1 : 0}>
        {reference && <CommentListControlReference reference={reference} clearReference={clearReference} />}
        <ClearableTextInput
          h={reference ? '21px' : '36px'}
          p="0"
          variant="unstyled"
          placeholder={t('comment:view.inputPlaceholder')}
          value={updater}
          onChangeText={handleTextChange}
        />
      </FVStack>
      <IconButton icon={<SendMessageIcon />} onPress={handleSend} isDisabled={!isValid} />
    </FHStack>
  );
};

export default CommentListControl;
