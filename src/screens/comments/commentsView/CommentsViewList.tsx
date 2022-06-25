import React, {Dispatch, MutableRefObject, ReactElement, SetStateAction, useCallback} from 'react';
import {useAppSelector} from '../../../store/store';
import {LayoutChangeEvent} from 'react-native';
import {useTheme} from 'native-base';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {Comment} from '../../../models/Comment';
import CommentsViewStub from './CommentsViewStub';
import CommentsViewItem from './CommentsViewItem';

type CommentsViewListProps = {
  setReference: Dispatch<SetStateAction<Comment>>;
  loadComments: () => void;
  setIsOnTheTop: Dispatch<SetStateAction<boolean>>;
  listRef: MutableRefObject<FlatListType>;
};

const CommentsViewList = ({setReference, loadComments, setIsOnTheTop, listRef}: CommentsViewListProps) => {
  const theme = useTheme();
  const comments = useAppSelector(CommentsSelectors.comments);

  const keyExtractor = useCallback((item: Comment): string => item.id, []);
  const renderItem = useCallback((item: Comment, onLayout: (event: LayoutChangeEvent) => void): ReactElement => {
    return (
      <CommentsViewItem
        onLayout={onLayout}
        comment={item}
        setReference={setReference}
        style={ListUtils.itemInvertedStyle(theme)}
      />
    );
  }, []);

  return (
    <FlatList
      ListEmptyComponent={<CommentsViewStub style={ListUtils.invertedStyle} />}
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

export default CommentsViewList;
