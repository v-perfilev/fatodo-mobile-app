import React, {Dispatch, SetStateAction} from 'react';
import {Box, IBoxProps} from 'native-base';
import {Comment} from '../../../models/Comment';
import CommentsViewComment from './commentsViewComment/CommentsViewComment';

type CommentsViewItemProps = IBoxProps & {
  item: Comment;
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentsViewItem = ({item, setReference, ...props}: CommentsViewItemProps) => {
  return (
    <Box {...props}>
      <CommentsViewComment comment={item} setReference={setReference} />
    </Box>
  );
};

export default CommentsViewItem;
