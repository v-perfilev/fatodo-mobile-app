import React, {useEffect, useMemo} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ItemForm from '../itemForm/ItemForm';
import FScrollView from '../../../components/boxes/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import GroupSelectors from '../../../store/group/groupSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import Header from '../../../components/layouts/Header';
import {ItemActions, ItemThunks} from '../../../store/item/itemActions';
import {GroupActions} from '../../../store/group/groupActions';

const ItemEdit = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const [loading, setLoading] = useDelayedState(false);
  const route = useRoute<RouteProp<GroupParamList, 'ItemEdit'>>();
  const routeItemId = route.params.itemId;
  const routeItem = route.params.item;
  const routeGroup = route.params.group;
  const group = useAppSelector(GroupSelectors.group);
  const groupLoading = useAppSelector(GroupSelectors.loading);
  const item = useAppSelector(ItemSelectors.item);
  const itemLoading = useAppSelector(ItemSelectors.loading);
  const reminders = useAppSelector(ItemSelectors.reminders);

  const goBack = (): void => navigation.goBack();
  const goToItemView = (): void =>
    navigation.getParent().getId() === 'ItemView'
      ? navigation.goBack()
      : navigation.navigate('ItemView', {
          group,
          item,
        });

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    dispatch(ItemThunks.updateItem(dto))
      .unwrap()
      .then(() => goToItemView())
      .catch(() => stopSubmitting());
  };

  const setGroupAndItem = (): void => {
    setLoading(true);
    dispatch(GroupActions.setGroup(routeGroup)).then(() => setLoading(false));
    dispatch(ItemActions.setItem(routeItem)).then(() => setLoading(false));
  };

  const loadItem = (): void => {
    setLoading(true);
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
      <ConditionalSpinner loading={loading || itemLoading || groupLoading}>
        <FScrollView>
          <ItemForm group={group} item={item} reminders={reminders} request={request} cancel={goBack} />
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default ItemEdit;
