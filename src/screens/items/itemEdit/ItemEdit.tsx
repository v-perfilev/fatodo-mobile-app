import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ItemForm from '../itemForm/ItemForm';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../shared/themes/ThemeProvider';
import Header from '../../../components/layouts/Header';
import {ItemActions} from '../../../store/item/itemActions';
import {WithItemProps} from '../../../shared/hocs/withContainers/withItemContainer';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import {flowRight} from 'lodash';
import withGroupContainer from '../../../shared/hocs/withContainers/withGroupContainer';

type ItemEditProps = WithItemProps;

const ItemEdit = ({group, item, loading}: ItemEditProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const reminders = useAppSelector(ItemSelectors.reminders);
  const theme = ThemeFactory.getTheme(group?.color);

  const routes = navigation.getState().routes;
  const isPreviousItemView = routes[routes.length - 2].name === 'ItemView';

  const goBack = (): void => navigation.goBack();
  const goToItemView = (): void =>
    isPreviousItemView ? navigation.goBack() : navigation.replace('ItemView', {group, item});

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    dispatch(ItemActions.updateItemThunk(dto))
      .unwrap()
      .then(() => goToItemView())
      .catch(() => stopSubmitting());
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ConditionalSpinner loading={loading}>
        <SimpleScrollView>
          <ItemForm group={group} item={item} reminders={reminders} request={request} cancel={goBack} />
        </SimpleScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default flowRight([memo, withGroupContainer, memo])(ItemEdit);
