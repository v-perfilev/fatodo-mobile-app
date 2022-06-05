import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Box, IBoxProps} from 'native-base';
import {Comment} from '../../../models/Comment';
import CommentsViewComment from './commentsViewComment/CommentsViewComment';
import {UsersThunks} from '../../../store/users/usersActions';
import {useAppDispatch} from '../../../store/store';

type CommentsViewItemProps = IBoxProps & {
  comment: Comment;
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentsViewItem = ({comment, setReference, ...props}: CommentsViewItemProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userIds = [comment.userId, comment.reference?.userId];
    dispatch(UsersThunks.handleUserIds(userIds));
  }, []);

  return (
    <Box {...props}>
      <CommentsViewComment comment={comment} setReference={setReference} />
    </Box>
  );
};

export default CommentsViewItem;
