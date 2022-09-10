import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {Box, Divider} from 'native-base';
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
import {LayoutChangeEvent, ListRenderItemInfo} from 'react-native';
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
import CentredFSpinner from '../../../components/surfaces/CentredFSpinner';

type GroupViewProps = WithGroupProps;

const GroupViewSeparator = (): ReactElement => <Divider bg="gray.200" />;

const GroupView = ({group, loading}: GroupViewProps) => {
  const dispatch = useAppDispatch();
  const rootNavigation = useNavigation<RootNavigationProp>();
  const groupNavigation = useNavigation<GroupNavigationProp>();
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const account = useAppSelector(AuthSelectors.account);
  const items = useAppSelector((state) => GroupSelectors.items(state, showArchived));
  const allItemsLoaded = useAppSelector((state) => GroupSelectors.allItemsLoaded(state, showArchived));
  const [initialItemsLoading, setInitialItemsLoading] = useState<boolean>(false);

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

  const load = useCallback(async (): Promise<void> => {
    const offset = items.length;
    showArchived
      ? await dispatch(GroupActions.fetchArchivedItemsThunk({groupId: group.id, offset}))
      : await dispatch(GroupActions.fetchActiveItemsThunk({groupId: group.id, offset}));
  }, [items, showArchived]);

  const refresh = useCallback(async (): Promise<void> => {
    showArchived
      ? await dispatch(GroupActions.refreshArchivedItemsThunk(group.id))
      : await dispatch(GroupActions.refreshActiveItemsThunk(group.id));
  }, [showArchived]);

  /*
  stub, keyExtractor and renderItem
   */

  const keyExtractor = useCallback((item: Item): string => item.id, []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<Item>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout}>
        <GroupItem item={info.item} group={group} canEdit={canEdit} />
      </Box>
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
    setInitialItemsLoading(true);
    load().finally(() => setInitialItemsLoading(false));
  }, [group]);

  useEffect(() => {
    if (items.length === 0) {
      setInitialItemsLoading(true);
      load().finally(() => setInitialItemsLoading(false));
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
        header={<GroupViewHeader showArchived={showArchived} setShowArchived={setShowArchived} />}
        headerHeight={HEADER_HEIGHT}
        loading={initialItemsLoading || loading}
        loadingPlaceholder={<GroupViewListSkeleton />}
        ListEmptyComponent={<GroupViewStub />}
        ListFooterComponent={!allItemsLoaded ? <CentredFSpinner /> : undefined}
        ItemSeparatorComponent={GroupViewSeparator}
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
