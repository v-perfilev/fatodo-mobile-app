import React, {useEffect} from 'react';
import {Divider} from 'native-base';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import Header from '../../../components/layouts/Header';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ItemViewMenu from './ItemViewMenu';
import ItemViewDescription from './ItemViewDescription';
import ItemViewTags from './ItemViewTags';
import ItemViewChanges from './ItemViewChanges';
import ItemViewDate from './itemViewDate';
import ItemViewPriority from './itemViewPriority';
import ItemViewType from './itemViewType';
import ItemViewGroup from './itemViewGroup';
import ItemReminders from './ItemReminders';
import ItemViewName from './itemViewName';
import FScrollView from '../../../components/surfaces/FScrollView';
import FVStack from '../../../components/surfaces/FVStack';
import FHStack from '../../../components/surfaces/FHStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import UsersThunks from '../../../store/users/usersThunks';
import ItemSelectors from '../../../store/item/itemSelectors';
import ItemThunks from '../../../store/item/itemThunks';
import GroupSelectors from '../../../store/group/groupSelectors';
import GroupThunks from '../../../store/group/groupThunks';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';

const ItemView = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const group = useAppSelector(GroupSelectors.group);
  const groupLoading = useAppSelector(GroupSelectors.loading);
  const item = useAppSelector(ItemSelectors.item);
  const itemLoading = useAppSelector(ItemSelectors.loading);
  const reminders = useAppSelector(ItemSelectors.reminders);
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemView'>>();
  const [loading, setLoading] = useLoadingState();
  const itemId = route.params.itemId;

  const theme = ThemeFactory.getTheme(group?.color);

  const goToGroupView = (): void => navigation.navigate('GroupView', {groupId: group.id});

  const showTags = item?.tags.length > 0;
  const showReminders = reminders?.length > 0;
  const showDividerAfterDescription = showTags || showReminders;

  useEffect(() => {
    setLoading(true);
    dispatch(ItemThunks.fetchItem(itemId))
      .unwrap()
      .catch(() => goToGroupView());
    dispatch(ItemThunks.fetchReminders(itemId));
  }, []);

  useEffect(() => {
    if (item) {
      const userIds = [item.createdBy, item.lastModifiedBy].filter((item) => item !== undefined);
      dispatch(UsersThunks.handleUserIds(userIds));
      dispatch(GroupThunks.fetchGroup(item.groupId))
        .unwrap()
        .catch(() => goToGroupView());
    }
  }, [item]);

  useEffect(() => {
    if (group) {
      const userIds = group.members.map((user) => user.id);
      dispatch(UsersThunks.handleUserIds(userIds));
    }
  }, [group]);

  useEffect(() => {
    if (!groupLoading && !itemLoading && reminders) {
      setLoading(false);
    }
  }, [groupLoading, itemLoading, reminders]);

  return (
    <ThemeProvider theme={theme}>
      <Header title={item?.title} showMenu={false} />
      <ConditionalSpinner loading={loading}>
        <FScrollView>
          <FVStack defaultSpace>
            <ItemViewMenu account={account} />
            <Divider bg="secondary.500" />
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
