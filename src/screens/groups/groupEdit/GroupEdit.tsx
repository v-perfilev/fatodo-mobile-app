import React, {useEffect, useMemo} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import GroupForm from '../groupForm/GroupForm';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FScrollView from '../../../components/boxes/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import GroupThunks from '../../../store/group/groupThunks';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import Header from '../../../components/layouts/Header';

const GroupEdit = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'GroupEdit'>>();
  const group = useAppSelector(GroupSelectors.group);
  const [loading, setLoading] = useDelayedState();
  const groupId = route.params.groupId;
  const colorScheme = route.params.colorScheme;

  const goToGroupView = (): void =>
    navigation.getParent().getId() === 'GroupView'
      ? navigation.replace('GroupView', {groupId: group.id, colorScheme: group.color})
      : navigation.goBack();
  const goBack = (): void => navigation.goBack();

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    dispatch(GroupThunks.updateGroup(formData))
      .unwrap()
      .then(() => goToGroupView())
      .catch(() => stopSubmitting());
  };

  useEffect(() => {
    setLoading(true);
    dispatch(GroupThunks.fetchGroup(groupId))
      .unwrap()
      .catch(() => goToGroupView())
      .finally(() => setLoading(false));
  }, [groupId]);

  const theme = useMemo<Theme>(() => {
    return group || colorScheme ? ThemeFactory.getTheme(group?.color || colorScheme) : ThemeFactory.getDefaultTheme();
  }, [group, colorScheme]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ConditionalSpinner loading={loading}>
        <FScrollView>
          <GroupForm group={group} request={request} cancel={goBack} />
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default GroupEdit;
