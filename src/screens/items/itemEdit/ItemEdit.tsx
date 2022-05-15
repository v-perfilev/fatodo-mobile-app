import React, {useEffect} from 'react';
import {Box, ScrollView} from 'native-base';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
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

const ItemEdit = () => {
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemEdit'>>();
  const itemId = route.params.itemId;
  const {handleCode, handleResponse} = useSnackContext();
  const {group, load: loadGroup} = useGroupViewContext();
  const {item, load: loadItem} = useItemViewContext();
  const {reminders, load: loadReminders} = useReminderListContext();

  const goToItemView = (): void => {
    navigation.navigate('ItemView', {itemId});
  };

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    ItemService.updateItem(dto)
      .then(() => {
        handleCode('item.updated', 'info');
        goToItemView();
      })
      .catch(({response}) => {
        handleResponse(response);
        stopSubmitting();
      });
  };

  useEffect(() => {
    loadItem(itemId);
    loadReminders(itemId);
  }, [itemId]);

  useEffect(() => {
    if (item) {
      loadGroup(item.groupId);
    }
  }, [item]);

  return (
    <ConditionalSpinner loading={!group || !item || !reminders}>
      <ScrollView>
        <Box mx="3" mt="1" mb="2">
          <ItemForm group={group} item={item} reminders={reminders} request={request} cancel={goToItemView} />
        </Box>
      </ScrollView>
    </ConditionalSpinner>
  );
};

export default flowRight([withHeader, withGroupView, withItemView, withReminderList])(ItemEdit);
