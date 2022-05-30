import React, {useEffect, useMemo} from 'react';
import {Divider, Theme} from 'native-base';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupParamList} from '../../../navigators/GroupNavigator';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ItemViewHeader from './ItemViewHeader';
import ItemViewDescription from './ItemViewDescription';
import ItemViewTags from './ItemViewTags';
import ItemViewChanges from './ItemViewChanges';
import ItemViewDate from './itemViewDate';
import ItemViewPriority from './itemViewPriority';
import ItemViewType from './itemViewType';
import ItemViewGroup from './itemViewGroup';
import ItemReminders from './ItemReminders';
import ItemViewName from './itemViewName';
import FScrollView from '../../../components/boxes/FScrollView';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import ItemSelectors from '../../../store/item/itemSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import GroupSelectors from '../../../store/group/groupSelectors';
import {UsersThunks} from '../../../store/users/usersActions';
import {ItemActions, ItemThunks} from '../../../store/item/itemActions';
import {GroupActions} from '../../../store/group/groupActions';

const ItemView = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useDelayedState();
  const route = useRoute<RouteProp<GroupParamList, 'ItemView'>>();
  const routeItemId = route.params.itemId;
  const routeItem = route.params.item;
  const routeGroup = route.params.group;
  const account = useAppSelector(AuthSelectors.account);
  const group = useAppSelector(GroupSelectors.group);
  const groupLoading = useAppSelector(GroupSelectors.loading);
  const item = useAppSelector(ItemSelectors.item);
  const itemLoading = useAppSelector(ItemSelectors.loading);
  const reminders = useAppSelector(ItemSelectors.reminders);

  const showTags = item?.tags.length > 0;
  const showReminders = reminders?.length > 0;
  const showDividerAfterDescription = showTags || showReminders;

  const goBack = (): void => navigation.goBack();

  const setGroupAndItem = (): void => {
    dispatch(GroupActions.setGroup(routeGroup)).then(() => setLoading(false));
    dispatch(ItemActions.setItem(routeItem)).then(() => setLoading(false));
  };

  const loadItem = (): void => {
    dispatch(ItemThunks.fetchItem(routeItemId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (routeGroup && routeItem && (routeGroup.id !== group?.id || routeItem.id !== item?.id)) {
      setGroupAndItem();
    } else if (routeItemId) {
      loadItem();
    } else if (!routeGroup && !routeItem && !routeItemId) {
      goBack();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (item) {
      const userIds = [item.createdBy, item.lastModifiedBy].filter((item) => item !== undefined);
      dispatch(UsersThunks.handleUserIds(userIds));
    }
  }, [item]);

  useEffect(() => {
    if (group) {
      const userIds = group.members.map((user) => user.id);
      dispatch(UsersThunks.handleUserIds(userIds));
    }
  }, [group]);

  const theme = useMemo<Theme>(() => {
    return group || routeGroup
      ? ThemeFactory.getTheme(group?.color || routeGroup.color)
      : ThemeFactory.getDefaultTheme();
  }, [group, routeGroup]);

  return (
    <ThemeProvider theme={theme}>
      <ItemViewHeader account={account} />
      <ConditionalSpinner loading={loading || itemLoading || groupLoading}>
        <FScrollView>
          <FVStack defaultSpace>
            <ItemViewName />
            <ItemViewGroup />
            <FHStack defaultSpace>
              <ItemViewType />
              <ItemViewPriority />
            </FHStack>
            <ItemViewDate />
            <Divider bg="secondary.500" />
            <ItemViewDescription />
            {showDividerAfterDescription && <Divider bg="secondary.500" />}
            {showReminders && <ItemReminders />}
            {showTags && <ItemViewTags />}
            <Divider bg="secondary.500" />
            <ItemViewChanges />
          </FVStack>
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default ItemView;
