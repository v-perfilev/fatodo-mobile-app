import React, {ComponentType, useEffect} from 'react';
import {GroupActions} from '../../../store/group/groupActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import GroupSelectors from '../../../store/group/groupSelectors';
import {Group} from '../../../models/Group';

export type WithGroupProps = {
  groupId: string;
  group?: Group;
  loading: boolean;
};

const withGroupContainer = (Component: ComponentType<WithGroupProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'withGroup'>>();
  const routeGroupId = route.params.groupId;
  const routeGroup = route.params.group;
  const group = useAppSelector(GroupSelectors.group);

  const canSetGroup = routeGroup && routeGroup.id !== group?.id;
  const canLoadGroup = routeGroupId && routeGroupId !== group?.id;
  const wrongRoute = !routeGroup && !routeGroupId;
  const loadingFinished = (routeGroup && routeGroup.id === group?.id) || (routeGroupId && routeGroupId === group?.id);

  const goBack = (): void => navigation.goBack();

  const setGroup = (): void => {
    dispatch(GroupActions.reset());
    dispatch(GroupActions.setGroup(routeGroup));
  };

  const loadGroup = (): void => {
    dispatch(GroupActions.fetchGroupThunk(routeGroupId))
      .unwrap()
      .catch(() => goBack());
  };

  useEffect(() => {
    if (canSetGroup) {
      setGroup();
    } else if (canLoadGroup) {
      loadGroup();
    } else if (wrongRoute) {
      goBack();
    }
  }, []);

  return (
    <Component
      loading={!loadingFinished}
      groupId={routeGroupId || routeGroup?.id}
      group={group || routeGroup}
      {...props}
    />
  );
};

export default withGroupContainer;
