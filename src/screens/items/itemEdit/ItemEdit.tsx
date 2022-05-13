import React, {useEffect} from 'react';
import {ScrollView} from 'native-base';
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

const ItemEdit = () => {
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemEdit'>>();
  const itemId = route.params.itemId;
  const {handleCode, handleResponse} = useSnackContext();
  const {group, load: loadGroup} = useGroupViewContext();
  const {item, load: loadItem} = useItemViewContext();

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
  }, [itemId]);

  useEffect(() => {
    if (item) {
      loadGroup(item.groupId);
    }
  }, [item]);

  return (
    <ConditionalSpinner loading={!group || !item}>
      <ScrollView px="3" py="1">
        <ItemForm group={group} item={item} request={request} cancel={goToItemView} />
      </ScrollView>
    </ConditionalSpinner>
  );
};

export default flowRight([withHeader, withGroupView, withItemView])(ItemEdit);
