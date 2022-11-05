import React, {memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import GroupViewHeader from './GroupViewHeader';
import {HEADER_HEIGHT, REFRESH_HEIGHT, TAB_HEIGHT} from '../../../constants';
import {FlatListType} from '../../../components/scrollable/FlatList';
import GroupViewStub from './GroupViewStub';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import {GroupActions} from '../../../store/group/groupActions';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {Item} from '../../../models/Item';
import {Dimensions, LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import AuthSelectors from '../../../store/auth/authSelectors';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableFlatListChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {CornerButton} from '../../../models/CornerButton';
import ArrowUpIcon from '../../../components/icons/ArrowUpIcon';
import CornerManagement from '../../../components/controls/CornerManagement';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../../navigators/RootNavigator';
import CommentsIcon from '../../../components/icons/CommentsIcon';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import PlusIcon from '../../../components/icons/PlusIcon';
import GroupItem from '../components/groupItem/GroupItem';
import GroupViewListSkeleton from '../skeletons/GroupViewListSkeleton';
import CentredLoader from '../../../components/surfaces/CentredLoader';
import Separator from '../../../components/layouts/Separator';
import {flowRight} from 'lodash';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';

type GroupViewProps = WithGroupProps;

const paddingTop = HEADER_HEIGHT;
const minHeight = Dimensions.get('window').height - HEADER_HEIGHT - TAB_HEIGHT + REFRESH_HEIGHT;
const containerStyle: StyleProp<ViewStyle> = {paddingTop, minHeight};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop};

const GroupView = ({groupId, group, containerLoading}: GroupViewProps) => {
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const itemsSelector = useCallback(GroupSelectors.makeItemsSelector(), []);
  const allItemsLoadedSelector = useCallback(GroupSelectors.makeAllItemsLoadedSelector(), []);
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const items = useAppSelector((state) => itemsSelector(state, showArchived));
  const allItemsLoaded = useAppSelector((state) => allItemsLoadedSelector(state, showArchived));
  const rootNavigation = useNavigation<RootNavigationProp>();
  const groupNavigation = useNavigation<GroupNavigationProp>();

  const listRef = useRef<FlatListType>();

  const canEdit = useMemo<boolean>(() => {
    return group && GroupUtils.canEdit(account, group);
  }, [group, account]);

  const goToItemCreate = useCallback((): void => groupNavigation.navigate('ItemCreate', {group}), [group]);

  const goToComments = useCallback((): void => {
    rootNavigation.navigate('CommentList', {
      targetId: group.id,
      colorScheme: group.color,
    });
  }, [group]);

  /*
  loaders
   */

  const initialLoad = useCallback(async (): Promise<void> => {
    showArchived
      ? await dispatch(GroupActions.fetchArchivedItemsThunk({groupId, offset: 0}))
      : await dispatch(GroupActions.fetchActiveItemsThunk({groupId, offset: 0}));
  }, [items, showArchived]);

  const load = useCallback(async (): Promise<void> => {
    const offset = items.length;
    showArchived
      ? await dispatch(GroupActions.fetchArchivedItemsThunk({groupId, offset}))
      : await dispatch(GroupActions.fetchActiveItemsThunk({groupId, offset}));
  }, [items, showArchived]);

  const refresh = useCallback(async (): Promise<void> => {
    showArchived
      ? await dispatch(GroupActions.refreshArchivedItemsThunk(groupId))
      : await dispatch(GroupActions.refreshActiveItemsThunk(groupId));
  }, [showArchived]);

  /*
  stub, keyExtractor and renderItem
   */

  const keyExtractor = useCallback((item: Item): string => item.id, []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<Item>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <GroupItem item={info.item} group={group} canEdit={canEdit} onLayout={onLayout} />
    ),
    [group],
  );

  /*
  scroll up button
   */

  const scrollUp = (): void => listRef.current.scrollToOffset({offset: 0});

  /*
  Effects
   */

  useEffect(() => {
    if (containerLoading || (items.length === 0 && !allItemsLoaded)) {
      initialLoad().finally();
    }
  }, [showArchived]);

  const buttons = useMemo<CornerButton[]>(
    () => [
      {icon: <PlusIcon />, action: goToItemCreate, hidden: !canEdit},
      {icon: <CommentsIcon />, action: goToComments},
      {icon: <ArrowUpIcon />, action: scrollUp, color: 'trueGray', hideOnTop: true, additionalColumn: true},
    ],
    [goToItemCreate, goToComments, canEdit],
  );

  const cornerManagement = useCallback(
    ({scrollY}: CollapsableRefreshableFlatListChildrenProps) => (
      <CornerManagement buttons={buttons} scrollY={scrollY} />
    ),
    [buttons],
  );

  return (
    <CollapsableRefreshableFlatList
      contentContainerStyle={containerStyle}
      loaderStyle={loaderStyle}
      header={<GroupViewHeader setShowArchived={setShowArchived} />}
      loading={containerLoading || (items.length === 0 && !allItemsLoaded)}
      loadingPlaceholder={<GroupViewListSkeleton />}
      ListEmptyComponent={<GroupViewStub />}
      ListFooterComponent={items.length > 0 && !allItemsLoaded ? <CentredLoader my="5" /> : undefined}
      ItemSeparatorComponent={Separator}
      data={items}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={!allItemsLoaded ? load : undefined}
      refresh={refresh}
      ref={listRef}
    >
      {cornerManagement}
    </CollapsableRefreshableFlatList>
  );
};

export default flowRight([memo, withGroupContainer, withThemeProvider, memo])(GroupView);
