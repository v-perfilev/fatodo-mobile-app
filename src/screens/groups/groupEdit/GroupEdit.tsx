import React, {useEffect} from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import ItemService from '../../../services/ItemService';
import GroupForm from '../groupForm/GroupForm';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FScrollView from '../../../components/surfaces/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import GroupSelectors from '../../../store/group/groupSelectors';
import GroupThunks from '../../../store/group/groupThunks';

const GroupEdit = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'GroupEdit'>>();
  const groupId = route.params.groupId;
  const group = useAppSelector(GroupSelectors.groupSelector);

  const goToGroupView = (): void => navigation.navigate('GroupView', {groupId});

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    ItemService.updateGroup(formData)
      .then(() => {
        dispatch(SnackActions.handleCode('group.updated', 'info'));
        goToGroupView();
      })
      .catch(() => {
        stopSubmitting();
      });
  };

  useEffect(() => {
    dispatch(GroupThunks.fetchGroup(groupId))
      .unwrap()
      .catch(() => goToGroupView());
  }, [groupId]);

  return (
    <ConditionalSpinner loading={!group}>
      <FScrollView>
        <GroupForm group={group} request={request} cancel={goToGroupView} />
      </FScrollView>
    </ConditionalSpinner>
  );
};

export default flowRight([withHeader])(GroupEdit);
