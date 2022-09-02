import React, {memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Box} from 'native-base';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import GroupViewHeader from './GroupViewHeader';
import {HEADER_HEIGHT} from '../../../constants';
import {FlatListType} from '../../../components/scrollable/FlatList';
import {ListUtils} from '../../../shared/utils/ListUtils';
import GroupViewStub from './groupViewItems/GroupViewStub';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import {GroupActions} from '../../../store/group/groupActions';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {Item} from '../../../models/Item';
import {LayoutChangeEvent} from 'react-native';
import GroupViewItem from './groupViewItem/GroupViewItem';
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
import {flowRight} from 'lodash';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import PlusIcon from '../../../components/icons/PlusIcon';

type GroupViewProps = WithGroupProps;

const GroupView = ({group, loading}: GroupViewProps) => {
  const dispatch = useAppDispatch();
  const rootNavigation = useNavigation<RootNavigationProp>();
  const groupNavigation = useNavigation<GroupNavigationProp>();
  const account = useAppSelector(AuthSelectors.account);
  const activeItems = useAppSelector(GroupSelectors.activeItems);
  const archivedItems = useAppSelector(GroupSelectors.archivedItems);
  const allActiveItemsLoaded = useAppSelector(GroupSelectors.allActiveItemsLoaded);
  const allArchivedItemsLoaded = useAppSelector(GroupSelectors.allArchivedItemsLoaded);
  const [initialItemsLoading, setInitialItemsLoading] = useState<boolean>(false);
  const [showArchived, setShowArchived] = useState<boolean>(false);
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

  const loadActive = async (): Promise<void> => {
    await dispatch(GroupActions.fetchActiveItemsThunk({groupId: group.id, offset: activeItems.length}));
  };

  const refreshActive = async (): Promise<void> => {
    await dispatch(GroupActions.refreshActiveItemsThunk(group.id));
  };

  const loadArchived = async (): Promise<void> => {
    await dispatch(GroupActions.fetchArchivedItemsThunk({groupId: group.id, offset: archivedItems.length}));
  };

  const refreshArchived = async (): Promise<void> => {
    await dispatch(GroupActions.refreshArchivedItemsThunk(group.id));
  };

  /*
  stub, keyExtractor and renderItem
   */

  const keyExtractor = (item: Item): string => item.id;
  const renderItem = (item: Item, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
    <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
      <GroupViewItem item={item} canEdit={canEdit} />
    </Box>
  );

  /*
  scroll down button
   */

  const scrollUp = (): void => listRef.current.scrollToOffset({offset: 0});

  /*
  Effects
   */

  useEffect(() => {
    if (loading) {
      setInitialItemsLoading(true);
    }
    if (!loading && showArchived) {
      setInitialItemsLoading(true);
      loadArchived().finally(() => setInitialItemsLoading(false));
    }
    if (!loading && !showArchived) {
      setInitialItemsLoading(true);
      loadActive().finally(() => setInitialItemsLoading(false));
    }
  }, [loading, showArchived]);

  const _data = showArchived ? archivedItems : activeItems;
  const _onArchivedEndReached = !allArchivedItemsLoaded ? loadArchived : undefined;
  const _onActiveEndReached = !allActiveItemsLoaded ? loadActive : undefined;
  const _onEndReacted = showArchived ? _onArchivedEndReached : _onActiveEndReached;
  const _refresh = showArchived ? refreshArchived : refreshActive;

  const header = useMemo<ReactElement>(
    () => <GroupViewHeader showArchived={showArchived} setShowArchived={setShowArchived} />,
    [showArchived],
  );

  const stub = useMemo<ReactElement>(() => <GroupViewStub />, []);

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
        header={header}
        headerHeight={HEADER_HEIGHT}
        loading={loading || initialItemsLoading}
        ListEmptyComponent={stub}
        data={_data}
        render={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={_onEndReacted}
        refresh={_refresh}
        ref={listRef}
      >
        {cornerManagement}
      </CollapsableRefreshableFlatList>
    </ThemeProvider>
  );
};

export default flowRight([memo, withGroupContainer])(GroupView);
