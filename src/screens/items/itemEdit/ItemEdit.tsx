import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ItemForm from '../itemForm/ItemForm';
import FScrollView from '../../../components/boxes/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import {Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import Header from '../../../components/layouts/Header';
import {ItemThunks} from '../../../store/item/itemActions';
import withItemContainer, {WithItemProps} from '../../../shared/hocs/withContainers/withItemContainer';

type ItemEditProps = WithItemProps;

const ItemEdit = ({group, item, loading}: ItemEditProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const reminders = useAppSelector(ItemSelectors.reminders);

  const goBack = (): void => navigation.goBack();
  const goToItemView = (): void =>
    navigation.getParent().getId() === 'ItemView'
      ? navigation.goBack()
      : navigation.navigate('ItemView', {
          group,
          item,
        });

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    dispatch(ItemThunks.updateItem(dto))
      .unwrap()
      .then(() => goToItemView())
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
          <ItemForm group={group} item={item} reminders={reminders} request={request} cancel={goBack} />
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default withItemContainer(ItemEdit);
