import React, {ComponentType, useEffect} from 'react';
import {GroupActions, GroupThunks} from '../../../store/group/groupActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {useDelayedState} from '../../hooks/useDelayedState';
import GroupSelectors from '../../../store/group/groupSelectors';
import {Group} from '../../../models/Group';
import {ItemActions, ItemThunks} from '../../../store/item/itemActions';
import ItemSelectors from '../../../store/item/itemSelectors';
import {Item} from '../../../models/Item';

export type WithItemProps = {
  group?: Group;
  item?: Item;
  loading: boolean;
};

const withItemContainer = (Component: ComponentType<WithItemProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const [loading, setLoading] = useDelayedState();
  const route = useRoute<RouteProp<GroupParamList, 'withItem'>>();
  const routeItemId = route.params.itemId;
  const routeItem = route.params.item;
  const routeGroup = route.params.group;
  const group = useAppSelector(GroupSelectors.group);
  const item = useAppSelector(ItemSelectors.item);

  const goBack = (): void => navigation.goBack();

  const setGroupAndItem = (): void => {
    Promise.all([dispatch(GroupActions.setGroup(routeGroup)), dispatch(ItemActions.setItem(routeItem))]).then(() =>
      setLoading(false),
    );
  };

  const loadItem = (): void => {
    dispatch(ItemThunks.fetchItem(routeItemId))
      .unwrap()
      .catch(() => goBack());
  };

  const loadGroup = (groupId: string): void => {
    dispatch(GroupThunks.fetchGroup(groupId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (routeGroup && routeItem && (routeGroup.id !== group?.id || routeItem.id !== item?.id)) {
      setGroupAndItem();
    } else if (routeItemId) {
      loadItem();
    } else if (!routeGroup && !routeItem && !routeItemId) {
      goBack();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    item && loadGroup(item.groupId);
  }, [item]);

  return <Component loading={loading} group={group || routeGroup} item={item || routeItem} {...props} />;
};

export default withItemContainer;
