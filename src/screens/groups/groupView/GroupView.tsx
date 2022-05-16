import React, {useEffect, useState} from 'react';
import {Divider} from 'native-base';
import {flowRight} from 'lodash';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import withAuthState from '../../../shared/hocs/withAuthState';
import withUserList from '../../../shared/hocs/withLists/withUserList';
import withArchivedItemList from '../../../shared/hocs/withLists/withArchivedItemList';
import withItemList from '../../../shared/hocs/withLists/withItemList';
import withGroupView from '../../../shared/hocs/withViews/withGroupView';
import {ReduxAuthState} from '../../../store/rerducers/AuthReducer';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import {useUserListContext} from '../../../shared/contexts/listContexts/userListContext';
import Header from '../../../components/layouts/Header';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import GroupViewMenu from './GroupViewMenu';
import GroupViewUsers from './GroupViewUsers';
import GroupViewItems from './groupViewItems/GroupViewItems';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FScrollView from '../../../components/surfaces/FScrollView';
import FVStack from '../../../components/surfaces/FVStack';

type GroupViewProps = ReduxAuthState;

const GroupView = ({account}: GroupViewProps) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'GroupView'>>();
  const groupId = route.params.groupId;
  const {handleUserIds} = useUserListContext();
  const {group, load: loadGroup} = useGroupViewContext();
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const goToGroupList = (): void => navigation.navigate('GroupList');

  const loadGroupUsers = (): void => {
    const userIds = group.members.map((user) => user.id);
    handleUserIds(userIds);
  };

  useEffect(() => {
    loadGroup(groupId, goToGroupList);
  }, []);

  useEffect(() => {
    group && loadGroupUsers();
    group && navigation.setParams({...route.params, color: group?.color});
  }, [group]);

  const theme = group ? ThemeFactory.getTheme(group.color) : ThemeFactory.getDefaultTheme();

  return (
    <ThemeProvider theme={theme}>
      <Header title={group?.title} imageFilename={group?.imageFilename} showMenu={false} />
      <ConditionalSpinner loading={!group}>
        <FScrollView>
          <FVStack defaultSpace>
            <GroupViewMenu account={account} />
            <Divider bg="secondary.500" />
            <GroupViewUsers />
            <Divider bg="secondary.500" />
            <GroupViewItems account={account} showArchived={showArchived} setShowArchived={setShowArchived} />
          </FVStack>
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default flowRight([withGroupView, withItemList, withArchivedItemList, withUserList, withAuthState])(GroupView);
