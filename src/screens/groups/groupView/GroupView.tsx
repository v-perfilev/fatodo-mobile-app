import React, {ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Box, Theme} from 'native-base';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import CollapsableHeaderContainer, {
  CollapsableHeaderChildrenProps,
} from '../../../components/layouts/CollapsableHeaderContainer';
import GroupViewHeader from './GroupViewHeader';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {HEADER_HEIGHT} from '../../../constants';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import {ListUtils} from '../../../shared/utils/ListUtils';
import GroupViewStub from './groupViewItems/GroupViewStub';
import GroupViewCorner from './GroupViewCorner';
import ScrollCornerButton from '../../../components/controls/ScrollCornerButton';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import {GroupThunks} from '../../../store/group/groupActions';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {Item} from '../../../models/Item';
import {LayoutChangeEvent} from 'react-native';
import GroupViewItem from './groupViewItem/GroupViewItem';
import AuthSelectors from '../../../store/auth/authSelectors';

type GroupViewProps = WithGroupProps;

const GroupView = ({group, loading}: GroupViewProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const activeItems = useAppSelector(GroupSelectors.activeItems);
  const archivedItems = useAppSelector(GroupSelectors.archivedItems);
  const activeItemsLoading = useAppSelector(GroupSelectors.activeItemsLoading);
  const archivedItemsLoading = useAppSelector(GroupSelectors.archivedItemsLoading);
  const allActiveItemsLoaded = useAppSelector(GroupSelectors.allActiveItemsLoaded);
  const allArchivedItemsLoaded = useAppSelector(GroupSelectors.allArchivedItemsLoaded);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [hideScroll, setHideScroll] = useState<boolean>(true);
  const listRef = useRef<FlatListType>();

  const theme = useMemo<Theme>(() => {
    return group ? ThemeFactory.getTheme(group?.color) : ThemeFactory.getDefaultTheme();
  }, [group]);

  const canEdit = useMemo<boolean>(() => group && GroupUtils.canEdit(account, group), [group, account]);

  /*
  loaders
   */

  const loadActive = async (): Promise<void> => {
    await dispatch(GroupThunks.fetchActiveItems({groupId: group.id, offset: activeItems.length}));
  };

  const refreshActive = async (): Promise<void> => {
    await dispatch(GroupThunks.refreshActiveItems(group.id));
  };

  const loadArchived = async (): Promise<void> => {
    await dispatch(GroupThunks.fetchArchivedItems({groupId: group.id, offset: archivedItems.length}));
  };

  const refreshArchived = async (): Promise<void> => {
    await dispatch(GroupThunks.refreshArchivedItems(group.id));
  };

  /*
stub, keyExtractor and renderItem
 */

  const keyExtractor = useCallback((item: Item): string => item.id, []);
  const renderItem = useCallback(
    (item: Item, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <GroupViewItem item={item} canEdit={canEdit} />
      </Box>
    ),
    [],
  );

  /*
  scroll down button
   */

  const scrollUp = useCallback((): void => {
    setHideScroll(true);
    listRef.current.scrollToOffset({offset: 0});
  }, [listRef.current]);

  /*
  Effects
   */

  useEffect(() => {
    if (!loading && showArchived && !allArchivedItemsLoaded) {
      loadArchived().finally();
    }
    if (!loading && !showArchived && !allActiveItemsLoaded) {
      loadActive().finally();
    }
  }, [loading, showArchived]);

  const _archivedItemsLoading = showArchived && archivedItemsLoading && archivedItems.length === 0;
  const _activeItemsLoading = !showArchived && activeItemsLoading && activeItems.length === 0;
  const _loading = loading || _archivedItemsLoading || _activeItemsLoading;
  const _data = showArchived ? archivedItems : activeItems;
  const _onArchivedEndReached = !allArchivedItemsLoaded ? loadArchived : undefined;
  const _onActiveEndReached = !allActiveItemsLoaded ? loadArchived : undefined;
  const _onEndReacted = showArchived ? _onArchivedEndReached : _onActiveEndReached;
  const _refresh = showArchived ? refreshArchived : refreshActive;

  return (
    <ThemeProvider theme={theme}>
      <CollapsableHeaderContainer
        header={<GroupViewHeader showArchived={showArchived} setShowArchived={setShowArchived} />}
      >
        {({handleEventScroll, handleEventSnap, flatListRef}: CollapsableHeaderChildrenProps) => (
          <ConditionalSpinner loading={_loading} paddingTop={HEADER_HEIGHT}>
            <FlatList
              contentContainerStyle={ListUtils.containerStyle(HEADER_HEIGHT)}
              ListEmptyComponent={<GroupViewStub />}
              data={_data}
              render={renderItem}
              keyExtractor={keyExtractor}
              onScroll={handleEventScroll}
              onMomentumScrollEnd={handleEventSnap}
              onEndReached={_onEndReacted}
              refresh={_refresh}
              setIsOnTheTop={setHideScroll}
              listRefs={[listRef, flatListRef]}
            />
            <GroupViewCorner />
            <ScrollCornerButton show={!hideScroll} scrollDown={scrollUp} />
          </ConditionalSpinner>
        )}
      </CollapsableHeaderContainer>
    </ThemeProvider>
  );
};

export default withGroupContainer(GroupView);
