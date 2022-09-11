import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import GroupViewHeader from './GroupViewHeader';
import {HEADER_HEIGHT} from '../../../constants';
import {FlatListType} from '../../../components/scrollable/FlatList';
import GroupViewStub from './GroupViewStub';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import {GroupActions} from '../../../store/group/groupActions';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {Item} from '../../../models/Item';
import {LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import AuthSelectors from '../../../store/auth/authSelectors';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableChildrenProps,
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
import GroupViewListSkeleton from '../components/skeletons/GroupViewListSkeleton';
import CentredLoader from '../../../components/surfaces/CentredLoader';
import Separator from '../../../components/layouts/Separator';

type GroupViewProps = WithGroupProps;

const containerStyle: StyleProp<ViewStyle> = {paddingTop: HEADER_HEIGHT};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop: HEADER_HEIGHT};

const GroupView = ({groupId, group, loading}: GroupViewProps) => {
  const dispatch = useAppDispatch();
  const rootNavigation = useNavigation<RootNavigationProp>();
  const groupNavigation = useNavigation<GroupNavigationProp>();
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const account = useAppSelector(AuthSelectors.account);
  const items = useAppSelector((state) => GroupSelectors.items(state, showArchived));
  const itemsLoading = useAppSelector((state) => GroupSelectors.itemsLoading(state, showArchived));
  const allItemsLoaded = useAppSelector((state) => GroupSelectors.allItemsLoaded(state, showArchived));

  const listRef = useRef<FlatListType>();

  const theme = ThemeFactory.getTheme(group?.color);
  const canEdit = group && GroupUtils.canEdit(account, group);

  const goToItemCreate = (): void => groupNavigation.navigate('ItemCreate', {group});
  const goToComments = (): void =>
    rootNavigation.navigate('CommentList', {
      targetId: group.id,
      colorScheme: group.color,
    });

  /*
  loaders
   */

  const initialLoad = useCallback(async (): Promise<void> => {
    showArchived
      ? dispatch(GroupActions.fetchArchivedItemsThunk({groupId, offset: 0}))
      : dispatch(GroupActions.fetchActiveItemsThunk({groupId, offset: 0}));
  }, [items, showArchived]);

  const load = useCallback(async (): Promise<void> => {
    const offset = items.length;
    showArchived
      ? dispatch(GroupActions.fetchArchivedItemsThunk({groupId, offset}))
      : dispatch(GroupActions.fetchActiveItemsThunk({groupId, offset}));
  }, [items, showArchived]);

  const refresh = useCallback(async (): Promise<void> => {
    showArchived
      ? dispatch(GroupActions.refreshArchivedItemsThunk(groupId))
      : dispatch(GroupActions.refreshActiveItemsThunk(groupId));
  }, [showArchived]);

  /*
  stub, keyExtractor and renderItem
   */

  const keyExtractor = useCallback((item: Item): string => item.id, []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<Item>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <GroupItem item={info.item} group={group} canEdit={canEdit} onLayout={onLayout} />
    ),
    [],
  );

  /*
  scroll down button
   */

  const scrollUp = (): void => listRef.current.scrollToOffset({offset: 0});

  /*
  Effects
   */

  useEffect(() => {
    if (loading || (items.length === 0 && !allItemsLoaded)) {
      initialLoad().finally();
    }
  }, [showArchived]);

  const buttons: CornerButton[] = [
    {icon: <PlusIcon />, action: goToItemCreate, hidden: !canEdit},
    {icon: <CommentsIcon />, action: goToComments},
    {icon: <ArrowUpIcon />, action: scrollUp, color: 'trueGray', hideOnTop: true, additionalColumn: true},
  ];
  const cornerManagement = useCallback(
    ({scrollY}: CollapsableRefreshableChildrenProps) => <CornerManagement buttons={buttons} scrollY={scrollY} />,
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CollapsableRefreshableFlatList
        containerStyle={containerStyle}
        loaderStyle={loaderStyle}
        header={<GroupViewHeader setShowArchived={setShowArchived} />}
        loading={loading || (items.length === 0 && itemsLoading)}
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
    </ThemeProvider>
  );
};

export default withGroupContainer(GroupView);
