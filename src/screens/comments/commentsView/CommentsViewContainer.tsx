import React, {Dispatch, memo, SetStateAction, useCallback, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import FBox from '../../../components/boxes/FBox';
import {FlatListType} from '../../../components/surfaces/FlatList';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsThunks} from '../../../store/comments/commentsActions';
import ScrollButton from '../../../components/controls/ScrollButton';
import CommentsViewList from './CommentsViewList';
import {Comment} from '../../../models/Comment';

type CommentsViewContainerProps = {
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentsViewContainer = ({setReference}: CommentsViewContainerProps) => {
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
      <ScrollButton show={!hideScroll} scrollDown={scrollDown} />
      <CommentsViewList
        setReference={setReference}
        loadComments={!allLoaded ? loadComments : undefined}
        setIsOnTheTop={setHideScroll}
        listRef={listRef}
      />
    </FBox>
  );
};

export default memo(CommentsViewContainer);
