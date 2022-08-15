import React, {ReactElement, useEffect, useRef, useState} from 'react';
import GroupListHeader from './GroupListHeader';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {GroupsActions, GroupsThunks} from '../../../store/groups/groupsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Group} from '../../../models/Group';
import {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {Box, useTheme} from 'native-base';
import {ListUtils} from '../../../shared/utils/ListUtils';
import GroupListItem from './GroupListItem';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import CornerButton from '../../../components/controls/CornerButton';
import PlusIcon from '../../../components/icons/PlusIcon';
import {HEADER_HEIGHT} from '../../../constants';
import CollapsableRefreshableFlatList from '../../../components/surfaces/CollapsableRefreshableFlatList';
import {FlatListType} from '../../../components/surfaces/FlatList';
import CollapsableDraggableList from '../../../components/surfaces/CollapsableDraggableList';
import {LayoutChangeEvent} from 'react-native';

const GroupList = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigation = useNavigation<GroupNavigationProp>();
  const groups = useAppSelector(GroupsSelectors.groups);
  const [hideScroll, setHideScroll] = useState<boolean>(true);
  const [sorting, setSorting] = useState<boolean>(false);
  const [loading, setLoading] = useDelayedState();
  const listRef = useRef<FlatListType>();

  const goToGroupCreate = (): void => navigation.navigate('GroupCreate');

  /*
  loaders
   */

  const refresh = async (): Promise<void> => {
    await dispatch(GroupsThunks.fetchGroups());
  };

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = (group: Group): string => group.id;

  const renderDraggableItem = (props: RenderItemParams<Group>) => (
    <ScaleDecorator activeScale={1.03}>
      <Box style={ListUtils.themedItemStyle(theme)}>
        <GroupListItem sorting={sorting} {...props} />
      </Box>
    </ScaleDecorator>
  );

  const renderFlatItem = (group: Group, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
    <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
      <GroupListItem item={group} sorting={false} isActive={false} drag={undefined} />
    </Box>
  );

  /*
  dragHandler
   */

  const handleDragEnd = ({data}: DragEndParams<Group>): void => {
    dispatch(GroupsActions.setGroups(data));
  };

  useEffect(() => {
    dispatch(GroupsThunks.fetchGroups()).finally(() => setLoading(false));
  }, []);

  const header = <GroupListHeader sorting={sorting} setSorting={setSorting} />;

  const draggableList = (
    <CollapsableDraggableList
      header={header}
      headerHeight={HEADER_HEIGHT}
      loading={loading}
      data={groups}
      renderItem={renderDraggableItem}
      keyExtractor={keyExtractor}
      handleDragEnd={handleDragEnd}
    />
  );

  const flatList = (
    <CollapsableRefreshableFlatList
      header={header}
      headerHeight={HEADER_HEIGHT}
      refresh={refresh}
      loading={loading}
      data={groups}
      render={renderFlatItem}
      keyExtractor={keyExtractor}
      setIsOnTheTop={setHideScroll}
      ref={listRef}
    >
      <CornerButton icon={<PlusIcon />} onPress={goToGroupCreate} show={!sorting} />
    </CollapsableRefreshableFlatList>
  );

  return sorting ? draggableList : flatList;
};

export default GroupList;
