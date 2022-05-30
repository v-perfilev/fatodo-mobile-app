import React from 'react';
import GroupForm from '../groupForm/GroupForm';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import FScrollView from '../../../components/boxes/FScrollView';
import {useAppDispatch} from '../../../store/store';
import GroupThunks from '../../../store/group/groupThunks';
import {Group} from '../../../models/Group';
import Header from '../../../components/layouts/Header';

const GroupCreate = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();

  const goToGroupView = (group: Group): void =>
    navigation.replace('GroupView', {
      groupId: group.id,
      colorScheme: group.color,
    });
  const goBack = (): void => navigation.goBack();

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    dispatch(GroupThunks.addGroup(formData))
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
