import React, {Dispatch, SetStateAction} from 'react';
import {Comment} from '../../../../models/Comment';
import IconButton from '../../../../components/controls/IconButton';
import ReplyIcon from '../../../../components/icons/ReplyIcon';

type CommentsViewCommentReferenceButtonProps = {
  comment: Comment;
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentsViewCommentReferenceButton = ({comment, setReference}: CommentsViewCommentReferenceButtonProps) => {
  const updateReference = (): void => setReference(comment);

  return <IconButton icon={<ReplyIcon />} onPress={updateReference} />;
};

export default CommentsViewCommentReferenceButton;
