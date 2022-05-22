import React from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import GroupForm from '../groupForm/GroupForm';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import FScrollView from '../../../components/surfaces/FScrollView';
import {useAppDispatch} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import GroupThunks from '../../../store/group/groupThunks';

const GroupCreate = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();

  const goToGroupView = (id: string): void => {
    navigation.navigate('GroupView', {groupId: id});
  };
  const goToGroupList = (): void => navigation.navigate('GroupList');

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    dispatch(GroupThunks.createGroup(formData))
      .unwrap()
      .then((group) => {
        dispatch(SnackActions.handleCode('group.created', 'info'));
        goToGroupView(group.id);
      })
      .catch(() => {
        stopSubmitting();
      });
  };
  return (
    <FScrollView>
      <GroupForm request={request} cancel={goToGroupList} />
    </FScrollView>
  );
};

export default flowRight([withHeader])(GroupCreate);
