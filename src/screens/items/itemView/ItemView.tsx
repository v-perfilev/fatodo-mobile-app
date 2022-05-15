import React, {useEffect} from 'react';
import {Divider, HStack, ScrollView, VStack} from 'native-base';
import {flowRight} from 'lodash';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import {useReminderListContext} from '../../../shared/contexts/listContexts/reminderListContext';
import withAuthState from '../../../shared/hocs/withAuthState';
import withReminderList from '../../../shared/hocs/withLists/withReminderList';
import withItemView from '../../../shared/hocs/withViews/withItemView';
import withGroupView from '../../../shared/hocs/withViews/withGroupView';
import {ReduxAuthState} from '../../../store/rerducers/AuthReducer';
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

type ItemViewProps = ReduxAuthState;

const ItemView = ({account}: ItemViewProps) => {
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
        <ScrollView>
          <VStack space="2" p="2">
            <ItemViewMenu account={account} />
            <Divider bg="secondary.500" />
            <ItemViewName />
            <ItemViewGroup />
            <HStack space="3">
              <ItemViewType />
              <ItemViewPriority />
            </HStack>
            <ItemViewDate />
            <Divider bg="secondary.500" />
            <ItemViewDescription />
            {showDividerAfterDescription && <Divider bg="secondary.500" />}
            {showReminders && <ItemReminders />}
            {showTags && <ItemViewTags />}
            <Divider bg="secondary.500" />
            <ItemViewChanges />
          </VStack>
        </ScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default flowRight([withGroupView, withItemView, withReminderList, withUserList, withAuthState])(ItemView);
