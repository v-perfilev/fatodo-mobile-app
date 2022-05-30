import React from 'react';
import GroupForm from '../groupForm/GroupForm';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import FScrollView from '../../../components/boxes/FScrollView';
import {useAppDispatch} from '../../../store/store';
import {Group} from '../../../models/Group';
import Header from '../../../components/layouts/Header';
import {GroupThunks} from '../../../store/group/groupActions';

const GroupCreate = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();

  const goBack = (): void => navigation.goBack();
  const goToGroupView = (group: Group): void => navigation.replace('GroupView', {group});

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    dispatch(GroupThunks.createGroup(formData))
      .unwrap()
      .then((group) => goToGroupView(group))
      .catch(() => stopSubmitting());
  };
  return (
    <>
      <Header />
      <FScrollView>
        <GroupForm request={request} cancel={goBack} />
      </FScrollView>
    </>
  );
};

export default GroupCreate;
