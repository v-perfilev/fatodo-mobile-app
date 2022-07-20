import React, {Dispatch, SetStateAction} from 'react';
import {Comment} from '../../../../models/Comment';
import ReplyIcon from '../../../../components/icons/ReplyIcon';
import PressableButton from '../../../../components/controls/PressableButton';

type CommentListItemReferenceButtonProps = {
  comment: Comment;
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentListItemReferenceButton = ({comment, setReference}: CommentListItemReferenceButtonProps) => {
  const updateReference = (): void => setReference(comment);

  return (
    <PressableButton onPress={updateReference}>
      <ReplyIcon color="primary.500" size="md" />
    </PressableButton>
  );
};

export default CommentListItemReferenceButton;
