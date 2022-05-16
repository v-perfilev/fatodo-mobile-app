import React, {useEffect} from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
import ItemService from '../../../services/ItemService';
import GroupForm from '../groupForm/GroupForm';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import withGroupView from '../../../shared/hocs/withViews/withGroupView';
import FScrollView from '../../../components/surfaces/FScrollView';

const GroupEdit = () => {
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'GroupEdit'>>();
  const groupId = route.params.groupId;
  const {handleCode, handleResponse} = useSnackContext();
  const {group, load: loadGroup} = useGroupViewContext();

  const goToGroupList = (): void => navigation.navigate('GroupList');
  const goToGroupView = (): void => navigation.navigate('GroupView', {groupId});

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    ItemService.updateGroup(formData)
      .then(() => {
        handleCode('group.updated', 'info');
        goToGroupView();
      })
      .catch(({response}) => {
        handleResponse(response);
        stopSubmitting();
      });
  };

  useEffect(() => {
    loadGroup(groupId, goToGroupView, goToGroupList);
  }, [groupId]);

  return (
    <ConditionalSpinner loading={!group}>
      <FScrollView>
        <GroupForm group={group} request={request} cancel={goToGroupView} />
      </FScrollView>
    </ConditionalSpinner>
  );
};

export default flowRight([withHeader, withGroupView])(GroupEdit);
