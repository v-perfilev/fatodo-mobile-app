import React, {useEffect, useState} from 'react';
import GroupListHeader from './GroupListHeader';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
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
import DraggableList from '../../../components/surfaces/DraggableList';
import CollapsableHeaderContainer, {
  CollapsableHeaderChildrenProps,
} from '../../../components/surfaces/CollapsableHeaderContainer';
import {HEADER_HEIGHT} from '../../../constants';

const GroupList = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigation = useNavigation<GroupNavigationProp>();
  const groups = useAppSelector(GroupsSelectors.groups);
  const [sorting, setSorting] = useState<boolean>(false);
  const [loading, setLoading] = useDelayedState();

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

  const extractKey = (group: Group): string => group.id;
  const renderItem = (props: RenderItemParams<Group>) => {
    return (
      <ScaleDecorator activeScale={1.03}>
        <Box style={ListUtils.themedItemStyle(theme)}>
          <GroupListItem sorting={sorting} {...props} />
        </Box>
      </ScaleDecorator>
    );
  };

  /*
  dragHandler
   */

  const handleDragEnd = ({data}: DragEndParams<Group>): void => {
    dispatch(GroupsActions.setGroups(data));
  };

  useEffect(() => {
    dispatch(GroupsThunks.fetchGroups()).finally(() => setLoading(false));
  }, []);

  return (
    <CollapsableHeaderContainer header={<GroupListHeader sorting={sorting} setSorting={setSorting} />}>
      {({handleOffsetScroll, handleEventSnap, collapsableRef}: CollapsableHeaderChildrenProps) => (
        <ConditionalSpinner loading={loading} paddingTop={HEADER_HEIGHT}>
          <DraggableList
            contentContainerStyle={ListUtils.containerStyle(HEADER_HEIGHT)}
            data={groups}
            renderItem={renderItem}
            keyExtractor={extractKey}
            handleDragEnd={handleDragEnd}
            refresh={!sorting && refresh}
            onScrollOffsetChange={handleOffsetScroll}
            onMomentumScrollEnd={handleEventSnap}
            ref={collapsableRef}
          />
          <CornerButton icon={<PlusIcon />} onPress={goToGroupCreate} show={!sorting} />
        </ConditionalSpinner>
      )}
    </CollapsableHeaderContainer>
  );
};

export default GroupList;
