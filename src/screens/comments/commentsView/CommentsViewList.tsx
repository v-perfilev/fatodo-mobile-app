import React, {Dispatch, MutableRefObject, ReactElement, SetStateAction, useCallback} from 'react';
import {useAppSelector} from '../../../store/store';
import {LayoutChangeEvent, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from 'native-base';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {Comment} from '../../../models/Comment';
import CommentsViewStub from './CommentsViewStub';
import CommentsViewItem from './CommentsViewItem';

const invertedStyle = {
  scaleY: -1,
} as StyleProp<ViewStyle>;

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
        style={[invertedStyle, ListUtils.itemStyle(theme)]}
      />
    );
  }, []);

  return (
    <FlatList
      ListEmptyComponent={<CommentsViewStub />}
      data={comments}
      renderItemWithLayout={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={loadComments}
      setIsOnTheTop={setIsOnTheTop}
      listRef={listRef}
      style={invertedStyle}
    />
  );
};

export default CommentsViewList;
