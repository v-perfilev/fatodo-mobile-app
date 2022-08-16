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
import PlusIcon from '../../../components/icons/PlusIcon';
import {HEADER_HEIGHT} from '../../../constants';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {FlatListType} from '../../../components/scrollable/FlatList';
import CollapsableDraggableList from '../../../components/scrollable/CollapsableDraggableList';
import {LayoutChangeEvent} from 'react-native';
import {CornerButton} from '../../../models/CornerButton';
import ArrowUpIcon from '../../../components/icons/ArrowUpIcon';
import CornerManagement from '../../../components/controls/CornerManagement';

const GroupList = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigation = useNavigation<GroupNavigationProp>();
  const groups = useAppSelector(GroupsSelectors.groups);
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

  /*
  scroll up button
   */

  const scrollUp = (): void => listRef.current.scrollToOffset({offset: 0});

  /*
  effects
   */

  useEffect(() => {
    dispatch(GroupsThunks.fetchGroups()).finally(() => setLoading(false));
  }, []);

  const header = <GroupListHeader sorting={sorting} setSorting={setSorting} />;

  const buttons: CornerButton[] = [
    {icon: <PlusIcon />, action: goToGroupCreate},
    {icon: <ArrowUpIcon />, action: scrollUp, color: 'trueGray', hideOnTop: true},
  ];

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
      ref={listRef}
    >
      {({scrollY}: CollapsableRefreshableChildrenProps) => <CornerManagement buttons={buttons} scrollY={scrollY} />}
    </CollapsableRefreshableFlatList>
  );

  return sorting ? draggableList : flatList;
};

export default GroupList;
