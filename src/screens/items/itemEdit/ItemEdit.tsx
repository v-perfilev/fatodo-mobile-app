import React, {useEffect} from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ItemForm from '../itemForm/ItemForm';
import FScrollView from '../../../components/surfaces/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import ItemSelectors from '../../../store/item/itemSelectors';
import ItemThunks from '../../../store/item/itemThunks';

const ItemEdit = () => {
  const dispatch = useAppDispatch();
  const item = useAppSelector(ItemSelectors.itemSelector);
  const reminders = useAppSelector(ItemSelectors.remindersSelector);
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemEdit'>>();
  const itemId = route.params.itemId;
  const {group, load: loadGroup} = useGroupViewContext();

  const goToGroupList = (): void => navigation.navigate('GroupList');
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
    dispatch(ItemThunks.fetchItem(itemId))
      .unwrap()
      .catch(() => goToItemView());
    dispatch(ItemThunks.fetchReminders(itemId));
  }, [itemId]);

  useEffect(() => {
    if (item) {
      loadGroup(item.groupId, goToItemView, goToGroupList);
    }
  }, [item]);

  return (
    <ConditionalSpinner loading={!group || !item || !reminders}>
      <FScrollView>
        <ItemForm group={group} item={item} reminders={reminders} request={request} cancel={goToItemView} />
      </FScrollView>
    </ConditionalSpinner>
  );
};

export default flowRight([withHeader])(ItemEdit);
