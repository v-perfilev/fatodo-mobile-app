import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ItemForm from '../itemForm/ItemForm';
import {useAppDispatch} from '../../../store/store';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../shared/themes/ThemeProvider';
import Header from '../../../components/layouts/Header';
import {ItemActions} from '../../../store/item/itemActions';
import {Item} from '../../../models/Item';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';

type ItemCreateProps = WithGroupProps;

const ItemCreate = ({group, loading}: ItemCreateProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const theme = ThemeFactory.getTheme(group?.color);

  const goBack = (): void => navigation.goBack();
  const goToItemView = (item: Item): void => navigation.replace('ItemView', {group, item});

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    dispatch(ItemActions.createItemThunk(dto))
      .unwrap()
      .then((item) => goToItemView(item))
      .catch(() => stopSubmitting());
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ConditionalSpinner loading={loading}>
        <SimpleScrollView>
          <ItemForm group={group} request={request} cancel={goBack} />
        </SimpleScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default withGroupContainer(ItemCreate);
