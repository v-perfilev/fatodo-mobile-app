import React from 'react';
import GroupForm from '../groupForm/GroupForm';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import {useAppDispatch} from '../../../store/store';
import {Group} from '../../../models/Group';
import Header from '../../../components/layouts/Header';
import {GroupActions} from '../../../store/group/groupActions';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';

const GroupCreate = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();

  const goBack = (): void => navigation.goBack();
  const goToGroupView = (group: Group): void => navigation.replace('GroupView', {group});

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    dispatch(GroupActions.createGroupThunk(formData))
      .unwrap()
      .then((group) => goToGroupView(group))
      .catch(() => stopSubmitting());
  };
  return (
    <>
      <Header />
      <SimpleScrollView>
        <GroupForm request={request} cancel={goBack} />
      </SimpleScrollView>
    </>
  );
};

export default GroupCreate;
