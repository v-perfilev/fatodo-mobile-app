import React, {Dispatch, SetStateAction} from 'react';
import {Box, IBoxProps} from 'native-base';
import {Comment} from '../../../models/Comment';
import CommentListItem from './commentListItem/CommentListItem';

type CommentListCommentProps = IBoxProps & {
  comment: Comment;
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentListComment = ({comment, setReference, ...props}: CommentListCommentProps) => {
  return (
    <Box {...props}>
      <CommentListItem comment={comment} setReference={setReference} />
    </Box>
  );
};

export default CommentListComment;
