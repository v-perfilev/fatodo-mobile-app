import React, {memo, ReactElement, useCallback, useMemo, useRef} from 'react';
import withCommentsContainer, {WithCommentsProps} from '../../../shared/hocs/withContainers/withCommentsContainer';
import {Comment} from '../../../models/Comment';
import {Box} from 'native-base';
import CommentListControl from './CommentListControl';
import {FlatListType} from '../../../components/scrollable/FlatList';
import CommentListStub from './CommentListStub';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';
import {LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import CommentListItem from './commentListItem/CommentListItem';
import {CornerButton} from '../../../models/CornerManagement';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import CornerManagement from '../../../components/controls/CornerManagement';
import {COMMENTS_INPUT_HEIGHT, DEFAULT_MARGIN, HEADER_HEIGHT} from '../../../constants';
import RefreshableFlatList, {
  RefreshableFlatListChildrenProps,
} from '../../../components/scrollable/RefreshableFlatList';
import CommentListSkeleton from '../skeletons/CommentListSkeleton';
import {flowRight} from 'lodash';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import Header from '../../../components/layouts/Header';
import CentredLoader from '../../../components/surfaces/CentredLoader';
import withKeyboardPaddingAvoiding from '../../../shared/hocs/withKeyboardPaddingAvoiding';

type CommentListProps = WithCommentsProps;

const paddingTop = COMMENTS_INPUT_HEIGHT + DEFAULT_MARGIN;
const paddingBottom = HEADER_HEIGHT;
const containerStyle: StyleProp<ViewStyle> = {paddingTop, paddingBottom};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop, paddingBottom};

const CommentList = ({containerLoading}: CommentListProps) => {
  const dispatch = useAppDispatch();
  const listRef = useRef<FlatListType>();
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const comments = useAppSelector(CommentsSelectors.comments);
  const allLoaded = useAppSelector(CommentsSelectors.allLoaded);
  const loading = useAppSelector(CommentsSelectors.loading);

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
        <CommentListItem comment={info.item} />
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
      nextNode={<CommentListControl />}
      refresh={refresh}
      loading={containerLoading}
      loadingPlaceholder={<CommentListSkeleton />}
      ListFooterComponent={comments.length > 0 && !allLoaded ? <CentredLoader my="5" /> : undefined}
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

export default flowRight([
  memo,
  withCommentsContainer,
  withThemeProvider,
  withKeyboardPaddingAvoiding(COMMENTS_INPUT_HEIGHT),
])(CommentList);
