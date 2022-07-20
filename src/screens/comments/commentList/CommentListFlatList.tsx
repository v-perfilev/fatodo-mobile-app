import React, {Dispatch, MutableRefObject, ReactElement, SetStateAction, useCallback} from 'react';
import {useAppSelector} from '../../../store/store';
import {LayoutChangeEvent} from 'react-native';
import {useTheme} from 'native-base';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {Comment} from '../../../models/Comment';
import CommentListStub from './CommentListStub';
import CommentListComment from './CommentListComment';

type CommentListFlatListProps = {
  setReference: Dispatch<SetStateAction<Comment>>;
  loadComments: () => void;
  setIsOnTheTop: Dispatch<SetStateAction<boolean>>;
  listRef: MutableRefObject<FlatListType>;
};

const CommentListFlatList = ({setReference, loadComments, setIsOnTheTop, listRef}: CommentListFlatListProps) => {
  const theme = useTheme();
  const comments = useAppSelector(CommentsSelectors.comments);

  const keyExtractor = useCallback((item: Comment): string => item.id, []);
  const renderItem = useCallback((item: Comment, onLayout: (event: LayoutChangeEvent) => void): ReactElement => {
    return (
      <CommentListComment
        onLayout={onLayout}
        comment={item}
        setReference={setReference}
        style={ListUtils.itemInvertedStyle(theme)}
      />
    );
  }, []);

  return (
    <FlatList
      ListEmptyComponent={<CommentListStub style={ListUtils.invertedStyle} />}
      data={comments}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={loadComments}
      setIsOnTheTop={setIsOnTheTop}
      listRef={listRef}
      style={ListUtils.invertedStyle}
      contentContainerStyle={ListUtils.containerInvertedStyle(theme)}
    />
  );
};

export default CommentListFlatList;
