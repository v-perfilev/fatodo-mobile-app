import React, {memo, ReactElement, useCallback, useMemo, useRef, useState} from 'react';
import withCommentsContainer, {WithCommentsProps} from '../../../shared/hocs/withContainers/withCommentsContainer';
import {Comment} from '../../../models/Comment';
import {Box} from 'native-base';
import CommentListControl from './CommentListControl';
import {FlatListType} from '../../../components/scrollable/FlatList';
import CommentListStub from './CommentListStub';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';
import {Dimensions, LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import CommentListItem from './commentListItem/CommentListItem';
import {CornerButton} from '../../../models/CornerButton';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import CornerManagement from '../../../components/controls/CornerManagement';
import {COMMENTS_INPUT_HEIGHT, HEADER_HEIGHT, REFRESH_HEIGHT, TAB_HEIGHT} from '../../../constants';
import RefreshableFlatList, {
  RefreshableFlatListChildrenProps,
} from '../../../components/scrollable/RefreshableFlatList';
import CommentListSkeleton from '../skeletons/CommentListSkeleton';
import {flowRight} from 'lodash';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import Header from '../../../components/layouts/Header';

type CommentListProps = WithCommentsProps;

const paddingTop = HEADER_HEIGHT;
const paddingBottom = COMMENTS_INPUT_HEIGHT;
const minHeight = Dimensions.get('window').height - HEADER_HEIGHT - COMMENTS_INPUT_HEIGHT - TAB_HEIGHT + REFRESH_HEIGHT;
const containerStyle: StyleProp<ViewStyle> = {paddingTop, paddingBottom, minHeight};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop, paddingBottom};

const CommentList = ({containerLoading}: CommentListProps) => {
  const dispatch = useAppDispatch();
  const listRef = useRef<FlatListType>();
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const comments = useAppSelector(CommentsSelectors.comments);
  const allLoaded = useAppSelector(CommentsSelectors.allLoaded);
  const loading = useAppSelector(CommentsSelectors.loading);
  const [reference, setReference] = useState<Comment>();

  const clearReference = (): void => {
    setReference(null);
  };

  /*
  loaders
   */

  const load = useCallback(async (): Promise<void> => {
    if (targetId) {
      await dispatch(CommentsActions.fetchCommentsThunk({targetId, offset: comments.length}));
    }
  }, [targetId, comments.length]);

  const refresh = useCallback(async (): Promise<void> => {
    if (targetId) {
      await dispatch(CommentsActions.refreshCommentsThunk(targetId));
    }
  }, [targetId]);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback((comment: Comment): string => comment.id, []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<Comment>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout}>
        <CommentListItem comment={info.item} setReference={setReference} />
      </Box>
    ),
    [],
  );

  /*
  scroll down button
   */

  const scrollDown = (): void => listRef.current.scrollToOffset({offset: 0});

  const buttons = useMemo<CornerButton[]>(
    () => [{icon: <ArrowDownIcon />, action: scrollDown, color: 'trueGray', hideOnTop: true}],
    [],
  );
  const cornerManagement = useCallback(
    ({scrollY}: RefreshableFlatListChildrenProps) => (
      <CornerManagement buttons={buttons} scrollY={scrollY} bottomPadding={COMMENTS_INPUT_HEIGHT} />
    ),
    [],
  );

  return (
    <RefreshableFlatList
      contentContainerStyle={containerStyle}
      loaderStyle={loaderStyle}
      header={<Header />}
      nextNode={<CommentListControl reference={reference} clearReference={clearReference} />}
      refresh={refresh}
      loading={containerLoading}
      loadingPlaceholder={<CommentListSkeleton />}
      inverted
      ListEmptyComponent={<CommentListStub />}
      data={comments}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={!allLoaded && !loading ? load : undefined}
      ref={listRef}
    >
      {cornerManagement}
    </RefreshableFlatList>
  );
};

export default flowRight([memo, withCommentsContainer, withThemeProvider, memo])(CommentList);
