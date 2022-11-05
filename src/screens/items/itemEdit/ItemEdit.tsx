import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ItemForm from '../itemForm/ItemForm';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import Header from '../../../components/layouts/Header';
import {ItemActions} from '../../../store/item/itemActions';
import withItemContainer, {WithItemProps} from '../../../shared/hocs/withContainers/withItemContainer';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import {flowRight} from 'lodash';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import {Reminder} from '../../../models/Reminder';

type ItemEditProps = WithItemProps;

const ItemEdit = ({group, item, containerLoading}: ItemEditProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const reminders = useAppSelector(ItemSelectors.reminders);

  const routes = navigation.getState().routes;
  const isPreviousItemView = routes[routes.length - 2].name === 'ItemView';

  const goBack = (): void => navigation.goBack();
  const goToItemView = (): void =>
    isPreviousItemView ? navigation.goBack() : navigation.replace('ItemView', {group, item});

  const request = (dto: ItemDTO, reminders: Reminder[], stopSubmitting: () => void): void => {
    dispatch(ItemActions.updateItemThunk({dto, reminders}))
      .unwrap()
      .then(() => goToItemView())
      .catch(() => stopSubmitting());
  };

  return (
    <>
      <Header />
      <ConditionalSpinner loading={containerLoading}>
        <SimpleScrollView>
          <ItemForm group={group} item={item} reminders={reminders} request={request} cancel={goBack} />
        </SimpleScrollView>
      </ConditionalSpinner>
    </>
  );
};

export default flowRight([memo, withItemContainer, withThemeProvider, memo])(ItemEdit);
