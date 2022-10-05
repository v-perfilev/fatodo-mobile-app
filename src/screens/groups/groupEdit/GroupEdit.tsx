import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import GroupForm from '../groupForm/GroupForm';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch} from '../../../store/store';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../shared/themes/ThemeProvider';
import Header from '../../../components/layouts/Header';
import {GroupActions} from '../../../store/group/groupActions';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';

type GroupEditProps = WithGroupProps;

const GroupEdit = ({group, loading}: GroupEditProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const theme = ThemeFactory.getTheme(group?.color);

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
    <ThemeProvider theme={theme}>
      <Header />
      <ConditionalSpinner loading={loading}>
        <SimpleScrollView>
          <GroupForm group={group} request={request} cancel={goBack} />
        </SimpleScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default withGroupContainer(GroupEdit);
