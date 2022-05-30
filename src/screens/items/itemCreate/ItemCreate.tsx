import React, {useEffect, useMemo} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ItemForm from '../itemForm/ItemForm';
import FScrollView from '../../../components/boxes/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import Header from '../../../components/layouts/Header';
import {GroupActions, GroupThunks} from '../../../store/group/groupActions';
import {ItemThunks} from '../../../store/item/itemActions';
import {Item} from '../../../models/Item';

const ItemCreate = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemCreate'>>();
  const [loading, setLoading] = useDelayedState();
  const routeGroup = route.params.group;
  const routeGroupId = route.params.groupId;
  const group = useAppSelector(GroupSelectors.group);
  const groupLoading = useAppSelector(GroupSelectors.loading);

  const goBack = (): void => navigation.goBack();
  const goToItemView = (item: Item): void => navigation.replace('ItemView', {group, item});

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    dispatch(ItemThunks.createItem(dto))
      .unwrap()
      .then((item) => goToItemView(item))
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
      <ConditionalSpinner loading={loading || groupLoading}>
        <FScrollView>
          <ItemForm group={group} request={request} cancel={goBack} />
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default ItemCreate;
