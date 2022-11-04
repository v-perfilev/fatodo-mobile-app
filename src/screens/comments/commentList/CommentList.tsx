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
import {LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import CommentListItem from './commentListItem/CommentListItem';
import {CornerButton} from '../../../models/CornerButton';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import CornerManagement from '../../../components/controls/CornerManagement';
import {COMMENTS_INPUT_HEIGHT, HEADER_HEIGHT} from '../../../constants';
import LoadableFlatList, {RefreshableFlatListChildrenProps} from '../../../components/scrollable/LoadableFlatList';
import CommentListSkeleton from '../skeletons/CommentListSkeleton';
import CommentListHeader from './CommentListHeader';
import {flowRight} from 'lodash';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';

type CommentListProps = WithCommentsProps;

const containerStyle: StyleProp<ViewStyle> = {paddingTop: HEADER_HEIGHT, paddingBottom: COMMENTS_INPUT_HEIGHT};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop: HEADER_HEIGHT, paddingBottom: COMMENTS_INPUT_HEIGHT};

const CommentList = ({loading}: CommentListProps) => {
  const dispatch = useAppDispatch();
  const listRef = useRef<FlatListType>();
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const comments = useAppSelector(CommentsSelectors.comments);
  const allLoaded = useAppSelector(CommentsSelectors.allLoaded);
  const [reference, setReference] = useState<Comment>();

  const clearReference = (): void => {
    setReference(null);
  };

  /*
  loaders
   */

  const load = useCallback(async (): Promise<void> => {
    await dispatch(CommentsActions.fetchCommentsThunk({targetId, offset: comments.length}));
  }, [targetId, comments.length]);

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
    <LoadableFlatList
      containerStyle={containerStyle}
      loaderStyle={loaderStyle}
      header={<CommentListHeader />}
      nextNode={<CommentListControl reference={reference} clearReference={clearReference} />}
      loading={loading}
      loadingPlaceholder={<CommentListSkeleton />}
      inverted
      ListEmptyComponent={<CommentListStub />}
      data={comments}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={!allLoaded ? load : undefined}
      ref={listRef}
    >
      {cornerManagement}
    </LoadableFlatList>
  );
};

export default flowRight([memo, withCommentsContainer, withThemeProvider, memo])(CommentList);
