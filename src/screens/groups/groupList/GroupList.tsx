import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import GroupListHeader from './GroupListHeader';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {GroupsActions} from '../../../store/groups/groupsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Group} from '../../../models/Group';
import {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import PlusIcon from '../../../components/icons/PlusIcon';
import {HEADER_HEIGHT} from '../../../constants';
import {FlatListType} from '../../../components/scrollable/FlatList';
import CollapsableDraggableList, {
  CollapsableRefreshableDraggableListChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableDraggableList';
import {StyleProp, ViewStyle} from 'react-native';
import {CornerButton} from '../../../models/CornerButton';
import ArrowUpIcon from '../../../components/icons/ArrowUpIcon';
import CornerManagement from '../../../components/controls/CornerManagement';
import GroupListCard from './groupListCard/GroupListCard';
import GroupListStub from './GroupListStub';

const paddingTop = HEADER_HEIGHT;
const containerStyle: StyleProp<ViewStyle> = {paddingTop};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop};

const GroupList = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation<GroupNavigationProps>();
  const groups = useAppSelector(GroupsSelectors.groups);
  const groupsInitialized = useAppSelector(GroupsSelectors.groupsInitialized);
  const shouldLoad = useAppSelector(GroupsSelectors.shouldLoad);
  const [sorting, setSorting] = useState<boolean>(false);
  const [loading, setLoading] = useDelayedState(!groupsInitialized);
  const listRef = useRef<FlatListType>();

  const goToGroupCreate = useCallback(() => navigation.navigate('GroupCreate'), []);

  /*
  loaders
   */

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(GroupsActions.refreshGroupsThunk());
  }, []);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback((group: Group): string => group.id, []);

  const renderDraggableItem = useCallback(
    ({item, drag}: RenderItemParams<Group>) => (
      <ScaleDecorator activeScale={1.03}>
        <GroupListCard group={item} sorting={sorting} drag={sorting ? drag : undefined} />
      </ScaleDecorator>
    ),
    [sorting],
  );

  /*
  dragHandler
   */

  const handleDragEnd = useCallback(({data}: DragEndParams<Group>): void => {
    dispatch(GroupsActions.setGroups(data));
  }, []);

  /*
  scroll up button
   */

  const scrollUp = (): void => listRef.current.scrollToOffset({offset: 0});

  /*
  effects
   */

  useEffect(() => {
    !groupsInitialized && dispatch(GroupsActions.fetchGroupsThunk()).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isFocused && groupsInitialized && shouldLoad) {
      dispatch(GroupsActions.refreshGroupsThunk());
    }
  }, [isFocused, shouldLoad]);

  const buttons = useMemo<CornerButton[]>(
    () => [
      {icon: <PlusIcon />, action: goToGroupCreate, hidden: groups.length === 0},
      {icon: <ArrowUpIcon />, action: scrollUp, color: 'trueGray', hideOnTop: true, additionalColumn: true},
    ],
    [groups.length],
  );
  const cornerManagement = useCallback(
    ({scrollY}: CollapsableRefreshableDraggableListChildrenProps) => (
      <CornerManagement buttons={buttons} scrollY={scrollY} />
    ),
    [],
  );

  return (
    <CollapsableDraggableList
      containerStyle={containerStyle}
      loaderStyle={loaderStyle}
      header={<GroupListHeader sorting={sorting} setSorting={setSorting} />}
      loading={loading}
      sorting={sorting}
      ListEmptyComponent={<GroupListStub />}
      refresh={refresh}
      data={groups}
      renderItem={renderDraggableItem}
      keyExtractor={keyExtractor}
      handleDragEnd={handleDragEnd}
      ref={listRef}
    >
      {cornerManagement}
    </CollapsableDraggableList>
  );
};

export default memo(GroupList);
