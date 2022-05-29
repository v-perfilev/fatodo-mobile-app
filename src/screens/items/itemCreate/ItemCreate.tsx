import React, {useEffect, useMemo} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ItemForm from '../itemForm/ItemForm';
import FScrollView from '../../../components/boxes/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import ItemThunks from '../../../store/item/itemThunks';
import GroupSelectors from '../../../store/group/groupSelectors';
import GroupThunks from '../../../store/group/groupThunks';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Theme} from 'native-base';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import Header from '../../../components/layouts/Header';

const ItemCreate = () => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const groupLoading = useAppSelector(GroupSelectors.loading);
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemCreate'>>();
  const [loading, setLoading] = useDelayedState();
  const groupId = route.params.groupId;
  const colorScheme = route.params.colorScheme;

  const goToItemView = (itemId: string): void => navigation.replace('ItemView', {itemId, colorScheme: group.color});
  const goBack = (): void => navigation.goBack();

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
      .catch(() => goBack())
      .finally(() => setLoading(false));
  }, [groupId]);

  const theme = useMemo<Theme>(() => {
    return group || colorScheme ? ThemeFactory.getTheme(group?.color || colorScheme) : ThemeFactory.getDefaultTheme();
  }, [group, colorScheme]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ConditionalSpinner loading={loading || groupLoading}>
        <FScrollView>
          <ItemForm group={group} request={request} cancel={goBack} />
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default ItemCreate;
