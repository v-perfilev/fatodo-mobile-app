import React, {Dispatch, memo, ReactElement, SetStateAction, useCallback, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import FBox from '../../../components/boxes/FBox';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsThunks} from '../../../store/comments/commentsActions';
import {Comment} from '../../../models/Comment';
import ScrollCornerButton from '../../../components/controls/ScrollCornerButton';
import CommentListStub from './CommentListStub';
import {ListUtils} from '../../../shared/utils/ListUtils';
import {LayoutChangeEvent} from 'react-native';
import {Box, useTheme} from 'native-base';
import CommentListItem from './commentListItem/CommentListItem';

type CommentListContainerProps = {
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentListContainer = ({setReference}: CommentListContainerProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [hideScroll, setHideScroll] = useState<boolean>(true);
  const listRef = useRef<FlatListType>();
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const comments = useAppSelector(CommentsSelectors.comments);
  const allLoaded = useAppSelector(CommentsSelectors.allLoaded);

  /*
  loaders
   */

  const load = async (): Promise<void> => {
    await dispatch(CommentsThunks.fetchComments({targetId, offset: comments.length}));
  };

  const refresh = async (): Promise<void> => {
    await dispatch(CommentsThunks.refreshComments(targetId));
  };

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback((item: Comment): string => item.id, []);
  const renderItem = useCallback(
    (item: Comment, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.itemStyle(theme)}>
        <CommentListItem comment={item} setReference={setReference} />
      </Box>
    ),
    [],
  );

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
      <FlatList
        inverted
        ListEmptyComponent={<CommentListStub />}
        data={comments}
        render={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={!allLoaded ? load : undefined}
        refresh={refresh}
        setIsOnTheTop={setHideScroll}
        listRef={listRef}
      />
    </FBox>
  );
};

export default memo(CommentListContainer);
