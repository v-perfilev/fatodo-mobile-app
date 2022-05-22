import React, {useEffect} from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ItemForm from '../itemForm/ItemForm';
import FScrollView from '../../../components/surfaces/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import ItemThunks from '../../../store/item/itemThunks';
import GroupSelectors from '../../../store/group/groupSelectors';
import GroupThunks from '../../../store/group/groupThunks';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';

const ItemCreate = () => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const groupLoading = useAppSelector(GroupSelectors.loading);
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemCreate'>>();
  const [loading, setLoading] = useLoadingState();
  const groupId = route.params.groupId;

  const goToGroupView = (): void => navigation.navigate('GroupView', {groupId});
  const goToItemView = (itemId: string): void => navigation.navigate('ItemView', {itemId});

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    dispatch(ItemThunks.createItem(dto))
      .unwrap()
      .then((item) => {
        dispatch(SnackActions.handleCode('item.created', 'info'));
        goToItemView(item.id);
      })
      .catch(() => {
        stopSubmitting();
      });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(GroupThunks.fetchGroup(groupId))
      .unwrap()
      .catch(() => goToGroupView());
  }, [groupId]);

  useEffect(() => {
    if (!groupLoading) {
      setLoading(false);
    }
  }, [groupLoading]);

  return (
    <ConditionalSpinner loading={loading}>
      <FScrollView>
        <ItemForm group={group} request={request} cancel={goToGroupView} />
      </FScrollView>
    </ConditionalSpinner>
  );
};

export default flowRight([withHeader])(ItemCreate);
