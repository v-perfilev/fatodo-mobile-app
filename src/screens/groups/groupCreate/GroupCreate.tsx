import React, {memo} from 'react';
import GroupForm from '../groupForm/GroupForm';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';
import {useAppDispatch} from '../../../store/store';
import {Group} from '../../../models/Group';
import Header from '../../../components/layouts/Header';
import {GroupActions} from '../../../store/group/groupActions';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import {flowRight} from 'lodash';
import withKeyboardHeightAvoiding from '../../../shared/hocs/withKeyboardHeightAvoiding';

const GroupCreate = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProps>();

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

export default flowRight([memo, withKeyboardHeightAvoiding])(GroupCreate);
