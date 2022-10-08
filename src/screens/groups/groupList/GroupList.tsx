import React, {ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import GroupListHeader from './GroupListHeader';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {GroupsActions} from '../../../store/groups/groupsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Group} from '../../../models/Group';
import {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import PlusIcon from '../../../components/icons/PlusIcon';
import {HEADER_HEIGHT} from '../../../constants';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableFlatListChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {FlatListType} from '../../../components/scrollable/FlatList';
import CollapsableDraggableList from '../../../components/scrollable/CollapsableDraggableList';
import {LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import {CornerButton} from '../../../models/CornerButton';
import ArrowUpIcon from '../../../components/icons/ArrowUpIcon';
import CornerManagement from '../../../components/controls/CornerManagement';
import GroupListCard from './groupListCard/GroupListCard';
import GroupListStub from './GroupListStub';

const containerStyle: StyleProp<ViewStyle> = {paddingTop: HEADER_HEIGHT};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop: HEADER_HEIGHT};

const GroupList = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const groups = useAppSelector(GroupsSelectors.groups);
  const [sorting, setSorting] = useState<boolean>(false);
  const [loading, setLoading] = useDelayedState();
  const listRef = useRef<FlatListType>();

  const goToGroupCreate = useCallback(() => navigation.navigate('GroupCreate'), []);

  /*
  loaders
   */

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(GroupsActions.fetchGroupsThunk());
  }, []);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback((group: Group): string => group.id, []);

  const renderDraggableItem = useCallback(
    (props: RenderItemParams<Group>) => (
      <ScaleDecorator activeScale={1.03}>
        <GroupListCard group={props.item} sorting={sorting} {...props} />
      </ScaleDecorator>
    ),
    [sorting],
  );

  const renderFlatItem = useCallback(
    (info: ListRenderItemInfo<Group>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <GroupListCard group={info.item} sorting={false} drag={undefined} onLayout={onLayout} />
    ),
    [],
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
    dispatch(GroupsActions.fetchGroupsThunk()).finally(() => setLoading(false));
  }, []);

  const buttons = useMemo<CornerButton[]>(
    () => [
      {icon: <PlusIcon />, action: goToGroupCreate},
      {icon: <ArrowUpIcon />, action: scrollUp, color: 'trueGray', hideOnTop: true, additionalColumn: true},
    ],
    [],
  );
  const cornerManagement = useCallback(
    ({scrollY}: CollapsableRefreshableFlatListChildrenProps) => (
      <CornerManagement buttons={buttons} scrollY={scrollY} />
    ),
    [],
  );

  const draggableList = (
    <CollapsableDraggableList
      containerStyle={containerStyle}
      header={<GroupListHeader sorting={sorting} setSorting={setSorting} />}
      data={groups}
      ListEmptyComponent={<GroupListStub />}
      renderItem={renderDraggableItem}
      keyExtractor={keyExtractor}
      handleDragEnd={handleDragEnd}
    />
  );

  const flatList = (
    <CollapsableRefreshableFlatList
      containerStyle={containerStyle}
      loaderStyle={loaderStyle}
      header={<GroupListHeader sorting={sorting} setSorting={setSorting} />}
      loading={loading}
      ListEmptyComponent={<GroupListStub />}
      refresh={refresh}
      data={groups}
      render={renderFlatItem}
      keyExtractor={keyExtractor}
      ref={listRef}
    >
      {cornerManagement}
    </CollapsableRefreshableFlatList>
  );

  return sorting ? draggableList : flatList;
};

export default GroupList;
