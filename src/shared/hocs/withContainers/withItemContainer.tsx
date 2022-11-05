import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {Group} from '../../../models/Group';
import {ItemActions} from '../../../store/item/itemActions';
import ItemSelectors from '../../../store/item/itemSelectors';
import {Item} from '../../../models/Item';
import {useDelayedState} from '../../hooks/useDelayedState';

export type WithItemProps = {
  group?: Group;
  item?: Item;
  containerLoading: boolean;
};

const withItemContainer = (Component: ComponentType<WithItemProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const stateGroup = useAppSelector(ItemSelectors.group);
  const stateItem = useAppSelector(ItemSelectors.item);
  const [containerLoading, setContainerLoading] = useDelayedState();
  const route = useRoute<RouteProp<GroupParamList, 'withItem'>>();
  const routeItemId = route.params.itemId;
  const routeItem = route.params.item;
  const routeGroup = route.params.group;
  const group = stateGroup || routeGroup;
  const item = stateItem?.id === routeItem?.id || stateItem?.id === routeItemId ? stateItem : routeItem;

  const canSetGroupAndItem =
    routeGroup && routeItem && (routeGroup.id !== stateGroup?.id || routeItem.id !== stateItem?.id);
  const canLoadGroupAndItem = routeItemId;
  const wrongRoute = !routeGroup && !routeItem && !routeItemId;

  const goBack = (): void => navigation.goBack();

  const setGroupAndItem = (): void => {
    Promise.all([
      dispatch(ItemActions.reset()),
      dispatch(ItemActions.setGroup(routeGroup)),
      dispatch(ItemActions.setItem(routeItem)),
    ]).finally(() => setContainerLoading(false));
  };

  const loadItem = (): void => {
    dispatch(ItemActions.fetchItemThunk(routeItemId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setContainerLoading(false));
  };

  useEffect(() => {
    if (canSetGroupAndItem) {
      setGroupAndItem();
    } else if (canLoadGroupAndItem) {
      loadItem();
    } else if (wrongRoute) {
      goBack();
    } else {
      setContainerLoading(false);
    }
  }, []);

  return <Component containerLoading={containerLoading} group={group} item={item} {...props} />;
};

export default withItemContainer;
