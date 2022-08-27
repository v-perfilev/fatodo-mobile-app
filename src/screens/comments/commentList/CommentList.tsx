import React, {ReactElement, useCallback, useMemo, useRef, useState} from 'react';
import withCommentsContainer, {WithCommentsProps} from '../../../shared/hocs/withContainers/withCommentsContainer';
import {Comment} from '../../../models/Comment';
import Header from '../../../components/layouts/Header';
import {Box, Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import CommentListControl from './CommentListControl';
import {FlatListType} from '../../../components/scrollable/FlatList';
import CommentListStub from './CommentListStub';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import CommentListItem from './commentListItem/CommentListItem';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {HEADER_HEIGHT} from '../../../constants';
import {CornerButton} from '../../../models/CornerButton';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import CornerManagement from '../../../components/controls/CornerManagement';

type CommentListProps = WithCommentsProps;

const CommentList = ({loading, colorScheme}: CommentListProps) => {
  const dispatch = useAppDispatch();
  const listRef = useRef<FlatListType>();
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const comments = useAppSelector(CommentsSelectors.comments);
  const allLoaded = useAppSelector(CommentsSelectors.allLoaded);
  const [reference, setReference] = useState<Comment>();

  const clearReference = (): void => {
    setReference(null);
  };

  const theme = useMemo<Theme>(() => {
    return colorScheme ? ThemeFactory.getTheme(colorScheme) : ThemeFactory.getDefaultTheme();
  }, [colorScheme]);

  /*
  loaders
   */

  const load = async (): Promise<void> => {
    await dispatch(CommentsActions.fetchCommentsThunk({targetId, offset: comments.length}));
  };

  const refresh = async (): Promise<void> => {
    await dispatch(CommentsActions.refreshCommentsThunk(targetId));
  };

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback((item: Comment): string => item.id, []);
  const renderItem = useCallback(
    (item: Comment, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <CommentListItem comment={item} setReference={setReference} />
      </Box>
    ),
    [],
  );

  /*
  scroll down button
   */

  const scrollDown = useCallback((): void => {
    listRef.current.scrollToOffset({offset: 0});
  }, [listRef.current]);

  const buttons: CornerButton[] = [{icon: <ArrowDownIcon />, action: scrollDown, color: 'trueGray', hideOnTop: true}];

  return (
    <ThemeProvider theme={theme}>
      <CollapsableRefreshableFlatList
        header={<Header />}
        headerHeight={HEADER_HEIGHT}
        nextNode={<CommentListControl reference={reference} clearReference={clearReference} />}
        refresh={refresh}
        loading={loading}
        inverted
        ListEmptyComponent={<CommentListStub />}
        data={comments}
        render={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={!allLoaded ? load : undefined}
        ref={listRef}
      >
        {({scrollY}: CollapsableRefreshableChildrenProps) => <CornerManagement buttons={buttons} scrollY={scrollY} />}
      </CollapsableRefreshableFlatList>
    </ThemeProvider>
  );
};

export default withCommentsContainer(CommentList);
