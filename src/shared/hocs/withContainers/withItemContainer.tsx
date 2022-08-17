import React, {ComponentType, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
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
  const group = useAppSelector(ItemSelectors.group);
  const item = useAppSelector(ItemSelectors.item);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRoute<RouteProp<GroupParamList, 'withItem'>>();
  const routeItemId = route.params.itemId;
  const routeItem = route.params.item;
  const routeGroup = route.params.group;

  const goBack = (): void => navigation.goBack();

  const setGroupAndItem = (): void => {
    Promise.all([dispatch(ItemActions.setGroup(routeGroup)), dispatch(ItemActions.setItem(routeItem))]).finally(() =>
      setLoading(false),
    );
  };

  const loadItem = (): void => {
    dispatch(ItemThunks.fetchItem(routeItemId))
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

  return <Component loading={loading} group={group || routeGroup} item={item || routeItem} {...props} />;
};

export default withItemContainer;
