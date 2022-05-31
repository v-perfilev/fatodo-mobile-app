import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ItemForm from '../itemForm/ItemForm';
import FScrollView from '../../../components/boxes/FScrollView';
import {useAppDispatch} from '../../../store/store';
import {Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import Header from '../../../components/layouts/Header';
import {ItemThunks} from '../../../store/item/itemActions';
import {Item} from '../../../models/Item';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';

type ItemCreateProps = WithGroupProps;

const ItemCreate = ({group, loading}: ItemCreateProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();

  const goBack = (): void => navigation.goBack();
  const goToItemView = (item: Item): void => navigation.replace('ItemView', {group, item});

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    dispatch(ItemThunks.createItem(dto))
      .unwrap()
      .then((item) => goToItemView(item))
      .catch(() => stopSubmitting());
  };

  const theme = useMemo<Theme>(() => {
    return group ? ThemeFactory.getTheme(group?.color) : ThemeFactory.getDefaultTheme();
  }, [group]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ConditionalSpinner loading={loading}>
        <FScrollView>
          <ItemForm group={group} request={request} cancel={goBack} />
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default withGroupContainer(ItemCreate);
