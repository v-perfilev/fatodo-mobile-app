import React from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import GroupForm from '../groupForm/GroupForm';
import ItemService from '../../../services/ItemService';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import FScrollView from '../../../components/surfaces/FScrollView';
import {useAppDispatch} from '../../../store/hooks';
import SnackActions from '../../../store/snack/snackActions';

const GroupCreate = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();

  const goToGroupView = (id: string): void => {
    navigation.navigate('GroupView', {groupId: id});
  };
  const goToGroupList = (): void => navigation.navigate('GroupList');

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    ItemService.createGroup(formData)
      .then((response) => {
        dispatch(SnackActions.handleCode('group.created', 'info'));
        const id = response.data.id;
        goToGroupView(id);
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
