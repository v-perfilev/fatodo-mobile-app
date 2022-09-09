import React, {ComponentType, useEffect} from 'react';
import {GroupActions} from '../../../store/group/groupActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {useDelayedState} from '../../hooks/useDelayedState';
import GroupSelectors from '../../../store/group/groupSelectors';
import {Group} from '../../../models/Group';

export type WithGroupProps = {
  group?: Group;
  loading: boolean;
};

const withGroupContainer = (Component: ComponentType<WithGroupProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const [loading, setLoading] = useDelayedState(true, 0);
  const route = useRoute<RouteProp<GroupParamList, 'withGroup'>>();
  const routeGroupId = route.params.groupId;
  const routeGroup = route.params.group;
  const group = useAppSelector(GroupSelectors.group);

  const goBack = (): void => navigation.goBack();

  const setGroup = (): void => {
    dispatch(GroupActions.setGroup(routeGroup)).then(() => setLoading(false));
  };

  const loadGroup = (): void => {
    dispatch(GroupActions.fetchGroupThunk(routeGroupId))
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

  return <Component loading={loading} group={routeGroup || group} {...props} />;
};

export default withGroupContainer;
