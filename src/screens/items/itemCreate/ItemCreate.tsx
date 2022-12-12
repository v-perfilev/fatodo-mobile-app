import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ItemForm from '../itemForm/ItemForm';
import {useAppDispatch} from '../../../store/store';
import Header from '../../../components/layouts/Header';
import {ItemActions} from '../../../store/item/itemActions';
import {Item} from '../../../models/Item';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import {flowRight} from 'lodash';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import {Reminder} from '../../../models/Reminder';
import withKeyboardHeightAvoiding from '../../../shared/hocs/withKeyboardHeightAvoiding';

type ItemCreateProps = WithGroupProps;

const ItemCreate = ({group, containerLoading}: ItemCreateProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProps>();

  const goBack = (): void => navigation.goBack();
  const goToItemView = (item: Item): void => navigation.replace('ItemView', {group, item});

  const request = (dto: ItemDTO, reminders: Reminder[], stopSubmitting: () => void): void => {
    dispatch(ItemActions.createItemThunk({dto, reminders}))
      .unwrap()
      .then((item) => goToItemView(item))
      .catch(() => stopSubmitting());
  };

  return (
    <>
      <Header />
      <ConditionalSpinner loading={containerLoading}>
        <SimpleScrollView>
          <ItemForm group={group} request={request} cancel={goBack} />
        </SimpleScrollView>
      </ConditionalSpinner>
    </>
  );
};

export default flowRight([memo, withGroupContainer, withThemeProvider, withKeyboardHeightAvoiding])(ItemCreate);
