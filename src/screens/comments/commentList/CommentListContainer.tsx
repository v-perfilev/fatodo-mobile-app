import React, {Dispatch, memo, SetStateAction, useCallback, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import FBox from '../../../components/boxes/FBox';
import {FlatListType} from '../../../components/surfaces/FlatList';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsThunks} from '../../../store/comments/commentsActions';
import {Comment} from '../../../models/Comment';
import CommentListFlatList from './CommentListFlatList';
import ScrollCornerButton from '../../../components/controls/ScrollCornerButton';

type CommentListContainerProps = {
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentListContainer = ({setReference}: CommentListContainerProps) => {
  const dispatch = useAppDispatch();
  const [hideScroll, setHideScroll] = useState<boolean>(true);
  const listRef = useRef<FlatListType>();
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const comments = useAppSelector(CommentsSelectors.comments);
  const allLoaded = useAppSelector(CommentsSelectors.allLoaded);

  const loadComments = (): void => {
    dispatch(CommentsThunks.fetchComments({targetId, offset: comments.length}));
  };

  /*
  scroll down button
   */

  const scrollDown = useCallback((): void => {
    setHideScroll(true);
    listRef.current.scrollToOffset({offset: 0});
  }, [listRef.current]);

  return (
    <FBox>
      <ScrollCornerButton show={!hideScroll} scrollDown={scrollDown} />
      <CommentListFlatList
        setReference={setReference}
        loadComments={!allLoaded ? loadComments : undefined}
        setIsOnTheTop={setHideScroll}
        listRef={listRef}
      />
    </FBox>
  );
};

export default memo(CommentListContainer);