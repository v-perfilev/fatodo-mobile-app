import React, {ComponentType, useEffect} from 'react';
import {GroupActions} from '../../../store/group/groupActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import GroupSelectors from '../../../store/group/groupSelectors';
import {Group} from '../../../models/Group';
import {ThemeFactory} from '../../themes/ThemeFactory';
import {useTabThemeContext} from '../../contexts/TabThemeContext';

export type WithGroupProps = {
  groupId: string;
  group?: Group;
  loading: boolean;
};

const withGroupContainer = (Component: ComponentType<WithGroupProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'withGroup'>>();
  const isFocused = useIsFocused();
  const {tabTheme, setTabTheme} = useTabThemeContext();
  const stateGroup = useAppSelector(GroupSelectors.group);
  const routeGroupId = route.params.groupId;
  const routeGroup = route.params.group;
  const groupId = routeGroupId || routeGroup?.id;
  const group = stateGroup?.id === routeGroup?.id || stateGroup?.id === routeGroupId ? stateGroup : routeGroup;
  const theme = ThemeFactory.getTheme(group?.color);

  const canSetGroup = routeGroup && routeGroup.id !== stateGroup?.id;
  const canLoadGroup = routeGroupId && routeGroupId !== stateGroup?.id;
  const wrongRoute = !routeGroup && !routeGroupId;
  const loadingFinished =
    (routeGroup && routeGroup.id === stateGroup?.id) || (routeGroupId && routeGroupId === stateGroup?.id);

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

  useEffect(() => {
    if (setTabTheme && isFocused && tabTheme !== theme) {
      setTabTheme(theme);
    }
  }, [isFocused, theme, setTabTheme]);

  return <Component loading={!loadingFinished} groupId={groupId} group={group} {...props} />;
};

export default withGroupContainer;
