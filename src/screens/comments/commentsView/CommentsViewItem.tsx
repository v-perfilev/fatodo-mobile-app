import React from 'react';
import {Box, IBoxProps} from 'native-base';
import {Comment} from '../../../models/Comment';

type CommentsViewItemProps = IBoxProps & {
  item: Comment;
};

const CommentsViewItem = ({item, ...props}: CommentsViewItemProps) => {
  // TODO
  return <Box {...props}>{item.id}</Box>;
};

export default CommentsViewItem;
