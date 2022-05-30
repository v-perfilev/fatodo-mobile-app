import React, {useEffect, useMemo} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import GroupForm from '../groupForm/GroupForm';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FScrollView from '../../../components/boxes/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import Header from '../../../components/layouts/Header';
import {GroupActions, GroupThunks} from '../../../store/group/groupActions';

const GroupEdit = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const [loading, setLoading] = useDelayedState();
  const route = useRoute<RouteProp<GroupParamList, 'GroupEdit'>>();
  const group = useAppSelector(GroupSelectors.group);
  const routeGroupId = route.params.groupId;
  const routeGroup = route.params.group;

  const goBack = (): void => navigation.goBack();
  const goToGroupView = (): void =>
    navigation.getParent().getId() === 'GroupView' ? navigation.goBack() : navigation.replace('GroupView', {group});

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    dispatch(GroupThunks.updateGroup(formData))
      .unwrap()
      .then(() => goToGroupView())
      .catch(() => stopSubmitting());
  };

  const setGroup = (): void => {
    dispatch(GroupActions.setGroup(routeGroup)).then(() => setLoading(false));
  };

  const loadGroup = (): void => {
    dispatch(GroupThunks.fetchGroup(routeGroupId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (routeGroup && routeGroup.id !== group?.id) {
      setGroup();
    } else if (routeGroupId && routeGroupId !== group?.id) {
      loadGroup();
    } else if (!routeGroup && !routeGroupId) {
      goBack();
    } else {
      setLoading(false);
    }
  }, []);

  const theme = useMemo<Theme>(() => {
    return group || routeGroup
      ? ThemeFactory.getTheme(group?.color || routeGroup.color)
      : ThemeFactory.getDefaultTheme();
  }, [group, routeGroup]);

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
