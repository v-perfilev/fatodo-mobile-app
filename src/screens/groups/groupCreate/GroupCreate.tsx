import React from 'react';
import GroupForm from '../groupForm/GroupForm';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import {useAppDispatch} from '../../../store/store';
import {Group} from '../../../models/Group';
import Header from '../../../components/layouts/Header';
import {GroupThunks} from '../../../store/group/groupActions';
import {ScrollView} from 'native-base';
import {DEFAULT_SPACE} from '../../../constants';
import {ListUtils} from '../../../shared/utils/ListUtils';

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
      <ScrollView contentContainerStyle={ListUtils.containerStyle(DEFAULT_SPACE)}>
        <GroupForm request={request} cancel={goBack} />
      </ScrollView>
    </>
  );
};

export default GroupCreate;
