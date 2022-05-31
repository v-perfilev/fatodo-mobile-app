import React, {useEffect, useMemo, useState} from 'react';
import {Divider, Theme} from 'native-base';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import GroupViewUsers from './GroupViewUsers';
import GroupViewItems from './groupViewItems/GroupViewItems';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FScrollView from '../../../components/boxes/FScrollView';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import GroupViewHeader from './GroupViewHeader';
import {GroupActions, GroupThunks} from '../../../store/group/groupActions';

const GroupView = () => {
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'GroupView'>>();
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const [loading, setLoading] = useDelayedState(false);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const routeGroupId = route.params.groupId;
  const routeGroup = route.params.group;

  const goBack = (): void => navigation.goBack();

  const setGroup = (): void => {
    setLoading(true);
    dispatch(GroupActions.setGroup(routeGroup)).then(() => setLoading(false));
  };

  const loadGroup = (): void => {
    setLoading(true);
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
    }
  }, []);

  const theme = useMemo<Theme>(() => {
    return group || routeGroup
      ? ThemeFactory.getTheme(group?.color || routeGroup.color)
      : ThemeFactory.getDefaultTheme();
  }, [group, routeGroup]);

  return (
    <ThemeProvider theme={theme}>
      <GroupViewHeader />
      <ConditionalSpinner loading={loading}>
        <FScrollView>
          <FVStack defaultSpace>
            <GroupViewUsers />
            <Divider bg="secondary.500" />
            <GroupViewItems showArchived={showArchived} setShowArchived={setShowArchived} />
          </FVStack>
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default GroupView;
