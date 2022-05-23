import React, {useEffect, useMemo} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ItemForm from '../itemForm/ItemForm';
import FScrollView from '../../../components/surfaces/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import ItemSelectors from '../../../store/item/itemSelectors';
import ItemThunks from '../../../store/item/itemThunks';
import GroupSelectors from '../../../store/group/groupSelectors';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import {Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import Header from '../../../components/layouts/Header';

const ItemEdit = () => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const groupLoading = useAppSelector(GroupSelectors.loading);
  const item = useAppSelector(ItemSelectors.item);
  const itemLoading = useAppSelector(ItemSelectors.loading);
  const reminders = useAppSelector(ItemSelectors.reminders);
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemEdit'>>();
  const [loading, setLoading] = useLoadingState();
  const itemId = route.params.itemId;
  const colorScheme = route.params.colorScheme;

  const goToItemView = (): void =>
    navigation.getParent().getId() === 'ItemView'
      ? navigation.goBack()
      : navigation.navigate('ItemView', {itemId, colorScheme: group.color});
  const goBack = (): void => navigation.goBack();

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    dispatch(ItemThunks.updateItem(dto))
      .unwrap()
      .then(() => {
        dispatch(SnackActions.handleCode('item.updated', 'info'));
        goToItemView();
      })
      .catch(() => {
        stopSubmitting();
      });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(ItemThunks.fetchItem(itemId))
      .unwrap()
      .catch(() => goToItemView())
      .finally(() => setLoading(false));
  }, [itemId]);

  const theme = useMemo<Theme>(() => {
    return group || colorScheme ? ThemeFactory.getTheme(group?.color || colorScheme) : ThemeFactory.getDefaultTheme();
  }, [group, colorScheme]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ConditionalSpinner loading={loading || itemLoading || groupLoading}>
        <FScrollView>
          <ItemForm group={group} item={item} reminders={reminders} request={request} cancel={goBack} />
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default ItemEdit;
