import React, {useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import FHStack from '../../../components/boxes/FHStack';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import SendMessageIcon from '../../../components/icons/SendMessageIcon';
import IconButton from '../../../components/controls/IconButton';
import {useTranslation} from 'react-i18next';
import {CommentDTO} from '../../../models/dto/CommentDTO';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsThunks} from '../../../store/comments/commentsActions';
import {Comment} from '../../../models/Comment';
import FVStack from '../../../components/boxes/FVStack';
import CommentsViewControlReference from './CommentsViewControlReference';

type CommentsViewControlProps = {
  reference: Comment;
  clearReference: () => void;
};

const CommentsViewControl = ({reference, clearReference}: CommentsViewControlProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const [messageBody, setMessageBody] = useState<string>('');
  const [updater, setUpdater] = useState<string>(undefined);

  const isValid = useMemo<boolean>(() => messageBody.length > 0, [messageBody]);

  const dto = useMemo<CommentDTO>(
    () => ({
      text: messageBody,
      referenceId: reference?.id,
    }),
    [messageBody, reference],
  );

  const handleTextChange = (text: string): void => {
    const trimmedText = text?.trim() || '';
    setMessageBody(trimmedText);
    setUpdater(undefined);
  };

  const handleSend = (): void => {
    setMessageBody('');
    setUpdater('');
    dispatch(CommentsThunks.sendComment({targetId, dto}));
  };

  return (
    <FHStack space="2" p="2" alignItems="center" borderTopWidth="1" borderTopColor="gray.200">
      <FVStack smallSpace>
        {reference && <CommentsViewControlReference reference={reference} clearReference={clearReference} />}
        <ClearableTextInput
          h="36px"
          px="2"
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

export default CommentsViewControl;
