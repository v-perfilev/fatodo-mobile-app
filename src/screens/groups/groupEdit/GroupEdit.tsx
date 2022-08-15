import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import GroupForm from '../groupForm/GroupForm';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch} from '../../../store/store';
import {ScrollView, Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import Header from '../../../components/layouts/Header';
import {GroupThunks} from '../../../store/group/groupActions';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import {DEFAULT_SPACE} from '../../../constants';
import {ListUtils} from '../../../shared/utils/ListUtils';

type GroupEditProps = WithGroupProps;

const GroupEdit = ({group, loading}: GroupEditProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();

  const goBack = (): void => navigation.goBack();
  const goToGroupView = (): void =>
    navigation.getParent().getId() === 'GroupView' ? navigation.goBack() : navigation.replace('GroupView', {group});

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    dispatch(GroupThunks.updateGroup(formData))
      .unwrap()
      .then(() => goToGroupView())
      .catch(() => stopSubmitting());
  };

  const theme = useMemo<Theme>(() => {
    return group ? ThemeFactory.getTheme(group?.color) : ThemeFactory.getDefaultTheme();
  }, [group]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ConditionalSpinner loading={loading}>
        <ScrollView contentContainerStyle={ListUtils.containerStyle(DEFAULT_SPACE)}>
          <GroupForm group={group} request={request} cancel={goBack} />
        </ScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default withGroupContainer(GroupEdit);
