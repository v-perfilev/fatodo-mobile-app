import React, {useEffect} from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ItemForm from '../itemForm/ItemForm';
import FScrollView from '../../../components/surfaces/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import ItemSelectors from '../../../store/item/itemSelectors';
import ItemThunks from '../../../store/item/itemThunks';
import GroupSelectors from '../../../store/group/groupSelectors';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';

const ItemEdit = () => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const groupLoading = useAppSelector(GroupSelectors.loading);
  const item = useAppSelector(ItemSelectors.item);
  const itemLoading = useAppSelector(ItemSelectors.loading);
  const reminders = useAppSelector(ItemSelectors.reminders);
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemEdit'>>();
  const [loading, setLoading] = useLoadingState();
  const itemId = route.params.itemId;

  const goToItemView = (): void => navigation.navigate('ItemView', {itemId});

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    dispatch(ItemThunks.updateItem(dto))
      .unwrap()
      .then(() => {
        dispatch(SnackActions.handleCode('item.updated', 'info'));
        goToItemView();
      })
      .catch(() => {
        stopSubmitting();
      });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(ItemThunks.fetchItem(itemId))
      .unwrap()
      .catch(() => goToItemView())
      .finally(() => setLoading(false));
  }, [itemId]);

  return (
    <ConditionalSpinner loading={loading || itemLoading || groupLoading}>
      <FScrollView>
        <ItemForm group={group} item={item} reminders={reminders} request={request} cancel={goToItemView} />
      </FScrollView>
    </ConditionalSpinner>
  );
};

export default flowRight([withHeader])(ItemEdit);
