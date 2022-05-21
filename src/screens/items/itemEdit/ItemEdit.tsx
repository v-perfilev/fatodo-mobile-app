import React, {useEffect} from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import ItemService from '../../../services/ItemService';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import withGroupView from '../../../shared/hocs/withViews/withGroupView';
import withItemView from '../../../shared/hocs/withViews/withItemView';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import ItemForm from '../itemForm/ItemForm';
import withReminderList from '../../../shared/hocs/withLists/withReminderList';
import {useReminderListContext} from '../../../shared/contexts/listContexts/reminderListContext';
import FScrollView from '../../../components/surfaces/FScrollView';
import {useAppDispatch} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';

const ItemEdit = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemEdit'>>();
  const itemId = route.params.itemId;
  const {group, load: loadGroup} = useGroupViewContext();
  const {item, load: loadItem} = useItemViewContext();
  const {reminders, load: loadReminders} = useReminderListContext();

  const goToGroupList = (): void => navigation.navigate('GroupList');
  const goToItemView = (): void => navigation.navigate('ItemView', {itemId});

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    ItemService.updateItem(dto)
      .then(() => {
        dispatch(SnackActions.handleCode('item.updated', 'info'));
        goToItemView();
      })
      .catch(() => {
        stopSubmitting();
      });
  };

  useEffect(() => {
    loadItem(itemId, goToItemView);
    loadReminders(itemId);
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

export default flowRight([withHeader, withGroupView, withItemView, withReminderList])(ItemEdit);
