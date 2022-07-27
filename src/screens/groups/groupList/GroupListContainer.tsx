import React from 'react';
import {DragEndParams, RenderItemParams, ScaleDecorator} from 'react-native-draggable-flatlist';
import {Group} from '../../../models/Group';
import {useTheme} from 'native-base';
import GroupListItem from './GroupListItem';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import {GroupsActions, GroupsThunks} from '../../../store/groups/groupsActions';
import {ListUtils} from '../../../shared/utils/ListUtils';
import DraggableList from '../../../components/surfaces/DraggableList';
import FBox from '../../../components/boxes/FBox';
import CornerButton from '../../../components/controls/CornerButton';
import PlusIcon from '../../../components/icons/PlusIcon';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';

type GroupListContainerProps = {
  sorting: boolean;
};

const GroupListContainer = ({sorting}: GroupListContainerProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigation = useNavigation<GroupNavigationProp>();
  const groups = useAppSelector(GroupsSelectors.groups);

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
        <GroupListItem sorting={sorting} style={ListUtils.itemStyle(theme)} {...props} />
      </ScaleDecorator>
    );
  };

  /*
  dragHandler
   */

  const handleDragEnd = ({data}: DragEndParams<Group>): void => {
    dispatch(GroupsActions.setGroups(data));
  };

  return (
    <FBox>
      <CornerButton icon={<PlusIcon />} onPress={goToGroupCreate} show={!sorting} />
      <DraggableList
        data={groups}
        renderItem={renderItem}
        keyExtractor={extractKey}
        handleDragEnd={handleDragEnd}
        refresh={!sorting && refresh}
      />
    </FBox>
  );
};

export default GroupListContainer;
