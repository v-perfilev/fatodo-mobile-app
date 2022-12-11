import React, {ComponentType, useEffect} from 'react';
import {GroupActions} from '../../../store/group/groupActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProps, GroupParamList} from '../../../navigators/GroupNavigator';
import GroupSelectors from '../../../store/group/groupSelectors';
import {Group} from '../../../models/Group';
import {useDelayedState} from '../../hooks/useDelayedState';

export type WithGroupProps = {
  groupId: string;
  group?: Group;
  containerLoading: boolean;
};

const withGroupContainer = (Component: ComponentType<WithGroupProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation<GroupNavigationProps>();
  const route = useRoute<RouteProp<GroupParamList, 'withGroup'>>();
  const stateGroup = useAppSelector(GroupSelectors.group);
  const shouldLoad = useAppSelector(GroupSelectors.shouldLoad);
  const [containerLoading, setContainerLoading] = useDelayedState(true, 500);
  const routeGroupId = route.params.groupId;
  const routeGroup = route.params.group;
  const groupId = routeGroupId || routeGroup?.id;
  const group = stateGroup?.id === routeGroup?.id || stateGroup?.id === routeGroupId ? stateGroup : routeGroup;

  const canSetGroup = routeGroup && routeGroup.id !== stateGroup?.id;
  const canLoadGroup = routeGroupId && routeGroupId !== stateGroup?.id;
  const wrongRoute = !routeGroup && !routeGroupId;

  const goToGroupList = (): void => navigation.navigate('GroupList');

  const setGroup = (): void => {
    dispatch(GroupActions.setGroup(routeGroup)).finally(() => setContainerLoading(false));
  };

  const loadGroup = (): void => {
    dispatch(GroupActions.fetchGroupThunk(routeGroupId))
      .unwrap()
      .catch(() => goToGroupList())
      .finally(() => setContainerLoading(false));
  };

  const reloadGroup = (): void => {
    dispatch(GroupActions.fetchGroupAfterRestartThunk(stateGroup.id))
      .unwrap()
      .catch(() => goToGroupList());
  };

  useEffect(() => {
    if (canSetGroup) {
      setGroup();
    } else if (canLoadGroup) {
      loadGroup();
    } else if (wrongRoute) {
      goToGroupList();
    } else {
      setContainerLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused && stateGroup && shouldLoad) {
      reloadGroup();
    }
  }, [isFocused, shouldLoad]);

  useEffect(() => {
    if (!group && !containerLoading) {
      goToGroupList();
    }
  }, [group]);

  return <Component containerLoading={containerLoading} groupId={groupId} group={group} {...props} />;
};

export default withGroupContainer;
