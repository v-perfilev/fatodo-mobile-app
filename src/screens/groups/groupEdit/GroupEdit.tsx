import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';
import GroupForm from '../groupForm/GroupForm';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch} from '../../../store/store';
import Header from '../../../components/layouts/Header';
import {GroupActions} from '../../../store/group/groupActions';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import {flowRight} from 'lodash';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';

type GroupEditProps = WithGroupProps;

const GroupEdit = ({group, containerLoading}: GroupEditProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProps>();

  const routes = navigation.getState().routes;
  const isPreviousGroupView = routes[routes.length - 2].name === 'GroupView';

  const goBack = (): void => navigation.goBack();
  const goToGroupView = (): void =>
    isPreviousGroupView ? navigation.goBack() : navigation.replace('GroupView', {group});

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    dispatch(GroupActions.updateGroupThunk(formData))
      .unwrap()
      .then(() => goToGroupView())
      .catch(() => stopSubmitting());
  };

  return (
    <>
      <Header />
      <ConditionalSpinner loading={containerLoading}>
        <SimpleScrollView>
          <GroupForm group={group} request={request} cancel={goBack} />
        </SimpleScrollView>
      </ConditionalSpinner>
    </>
  );
};

export default flowRight([memo, withGroupContainer, withThemeProvider, memo])(GroupEdit);
