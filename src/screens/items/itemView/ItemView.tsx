import React, {useEffect} from 'react';
import {Divider} from 'native-base';
import {flowRight} from 'lodash';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import {useReminderListContext} from '../../../shared/contexts/listContexts/reminderListContext';
import withReminderList from '../../../shared/hocs/withLists/withReminderList';
import withItemView from '../../../shared/hocs/withViews/withItemView';
import withGroupView from '../../../shared/hocs/withViews/withGroupView';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import Header from '../../../components/layouts/Header';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ItemViewMenu from './ItemViewMenu';
import {useUserListContext} from '../../../shared/contexts/listContexts/userListContext';
import ItemViewDescription from './ItemViewDescription';
import ItemViewTags from './ItemViewTags';
import ItemViewChanges from './ItemViewChanges';
import ItemViewDate from './itemViewDate';
import ItemViewPriority from './itemViewPriority';
import ItemViewType from './itemViewType';
import ItemViewGroup from './itemViewGroup';
import ItemReminders from './ItemReminders';
import withUserList from '../../../shared/hocs/withLists/withUserList';
import ItemViewName from './itemViewName';
import FScrollView from '../../../components/surfaces/FScrollView';
import FVStack from '../../../components/surfaces/FVStack';
import FHStack from '../../../components/surfaces/FHStack';
import {useAppSelector} from '../../../store/hooks';
import AuthSelectors from '../../../store/auth/authSelectors';

const ItemView = () => {
  const account = useAppSelector(AuthSelectors.accountSelector);
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemView'>>();
  const itemId = route.params.itemId;
  const {handleUserIds} = useUserListContext();
  const {item, load: loadItem} = useItemViewContext();
  const {group, load: loadGroup} = useGroupViewContext();
  const {reminders, load: loadReminders} = useReminderListContext();

  const theme = ThemeFactory.getTheme(group?.color);

  const goToGroupList = (): void => navigation.navigate('GroupList');
  const goToGroupView = (): void => navigation.navigate('GroupView', {groupId: group.id});

  const showTags = item?.tags.length > 0;
  const showReminders = reminders?.length > 0;
  const showDividerAfterDescription = showTags || showReminders;

  useEffect(() => {
    loadItem(itemId, goToGroupView);
    loadReminders(itemId);
  }, []);

  useEffect(() => {
    if (item) {
      loadGroup(item.groupId, goToGroupView, goToGroupList);
    }
  }, [item]);

  useEffect(() => {
    if (group) {
      const userIds = group.members.map((user) => user.id);
      handleUserIds(userIds);
    }
  }, [group]);

  return (
    <ThemeProvider theme={theme}>
      <Header title={item?.title} showMenu={false} />
      <ConditionalSpinner loading={!group || !item}>
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

export default flowRight([withGroupView, withItemView, withReminderList, withUserList])(ItemView);
