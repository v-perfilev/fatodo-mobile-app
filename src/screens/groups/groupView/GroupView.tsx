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

  // TODO optimize
  useEffect(() => {
    if (!loading && showArchived) {
      loadArchived().finally();
    }
    if (!loading && !showArchived) {
      loadActive().finally();
    }
  }, [loading, group, showArchived]);

  return (
    <ThemeProvider theme={theme}>
      <CollapsableHeaderContainer
        header={<GroupViewHeader showArchived={showArchived} setShowArchived={setShowArchived} />}
      >
        {({handleEventScroll, handleEventSnap, flatListRef}: CollapsableHeaderChildrenProps) => (
          <ConditionalSpinner loading={loading} paddingTop={HEADER_HEIGHT}>
            <FlatList
              contentContainerStyle={ListUtils.containerStyle(HEADER_HEIGHT)}
              ListEmptyComponent={<GroupViewStub />}
              data={showArchived ? archivedItems : activeItems}
              render={renderItem}
              keyExtractor={keyExtractor}
              onScroll={handleEventScroll}
              onMomentumScrollEnd={handleEventSnap}
              onEndReached={showArchived ? loadArchived : loadActive}
              refresh={showArchived ? refreshArchived : refreshActive}
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
