import React, {useEffect} from 'react';
import {Box, ScrollView} from 'native-base';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ItemService from '../../../services/ItemService';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ItemForm from '../itemForm/ItemForm';
import withGroupView from '../../../shared/hocs/withViews/withGroupView';
import withItemView from '../../../shared/hocs/withViews/withItemView';
import withReminderList from '../../../shared/hocs/withLists/withReminderList';

const ItemCreate = () => {
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemCreate'>>();
  const groupId = route.params.groupId;
  const {handleCode, handleResponse} = useSnackContext();
  const {group, load: loadGroup} = useGroupViewContext();

  const goToGroupView = (): void => {
    navigation.navigate('GroupView', {groupId});
  };

  const goToItemView = (itemId: string): void => {
    navigation.navigate('ItemView', {itemId});
  };

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    ItemService.createItem(dto)
      .then(({data}) => {
        handleCode('item.created', 'info');
        goToItemView(data.id);
      })
      .catch(({response}) => {
        handleResponse(response);
        stopSubmitting();
      });
  };

  useEffect(() => {
    loadGroup(groupId);
  }, [groupId]);

  return (
    <ConditionalSpinner loading={!group}>
      <ScrollView>
        <Box mx="3" mt="1" mb="2">
          <ItemForm group={group} request={request} cancel={goToGroupView} />
        </Box>
      </ScrollView>
    </ConditionalSpinner>
  );
};

export default flowRight([withHeader, withGroupView, withItemView, withReminderList])(ItemCreate);
