import React, {useEffect} from 'react';
import {Box, ScrollView} from 'native-base';
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
import ItemViewInfo from './itemViewInfo/itemViewInfo';
import ItemViewDescription from './ItemViewDescription';
import ItemReminders from './ItemViewReminders';
import ItemViewTags from './ItemViewTags';
import ItemViewChanges from './ItemViewChanges';
import ItemViewInfoGroup from './itemViewInfo/itemViewInfoGroup';
import ItemViewInfoType from './itemViewInfo/itemViewInfoType';
import ItemViewInfoPriority from './itemViewInfo/itemViewInfoPriority';
import ItemViewInfoDate from './itemViewInfo/itemViewInfoDate';

type ItemViewProps = ReduxAuthState;

const ItemView = ({account}: ItemViewProps) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'ItemView'>>();
  const itemId = route.params.itemId;
  const {handleUserIds} = useUserListContext();
  const {item, load: loadItem} = useItemViewContext();
  const {group, load: loadGroup} = useGroupViewContext();
  const {load: loadReminders} = useReminderListContext();

  const theme = ThemeFactory.getTheme(group?.color);

  const goToGroupView = (): void => {
    navigation.navigate('GroupView', {groupId: group.id});
  };

  useEffect(() => {
    loadItem(itemId, goToGroupView);
    loadReminders(itemId);
  }, []);

  useEffect(() => {
    if (item) {
      loadGroup(item.groupId, goToGroupView);
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
          <Box p="1">
            <ItemViewMenu account={account} />
            <Box>
              <ItemViewInfoGroup />
              <ItemViewInfoType />
              <ItemViewInfoPriority />
              <ItemViewInfoDate />
            </Box>
            <ItemViewDescription />
            <ItemReminders />
            <ItemViewTags />
            <ItemViewChanges />
          </Box>
        </ScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default flowRight([withGroupView, withItemView, withReminderList, withAuthState])(ItemView);
