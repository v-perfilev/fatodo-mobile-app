import React, {useEffect, useState} from 'react';
import {Divider} from 'native-base';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import Header from '../../../components/layouts/Header';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import GroupViewMenu from './GroupViewMenu';
import GroupViewUsers from './GroupViewUsers';
import GroupViewItems from './groupViewItems/GroupViewItems';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FScrollView from '../../../components/surfaces/FScrollView';
import FVStack from '../../../components/surfaces/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import UsersThunks from '../../../store/users/usersThunks';
import GroupSelectors from '../../../store/group/groupSelectors';
import GroupThunks from '../../../store/group/groupThunks';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';

const GroupView = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const group = useAppSelector(GroupSelectors.group);
  const groupLoading = useAppSelector(GroupSelectors.loading);
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'GroupView'>>();
  const [loading, setLoading] = useLoadingState();
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const groupId = route.params.groupId;

  const goToGroupList = (): void => navigation.navigate('GroupList');

  const loadGroupUsers = (): void => {
    const userIds = group.members.map((user) => user.id);
    dispatch(UsersThunks.handleUserIds(userIds));
  };

  useEffect(() => {
    setLoading(true);
    dispatch(GroupThunks.fetchGroup(groupId))
      .unwrap()
      .catch(() => goToGroupList());
  }, []);

  useEffect(() => {
    group && loadGroupUsers();
    group && navigation.setParams({...route.params, color: group?.color});
  }, [group]);

  useEffect(() => {
    if (!groupLoading) {
      setLoading(false);
    }
  }, [groupLoading]);

  const theme = group ? ThemeFactory.getTheme(group.color) : ThemeFactory.getDefaultTheme();

  return (
    <ThemeProvider theme={theme}>
      <Header title={group?.title} imageFilename={group?.imageFilename} showMenu={false} />
      <ConditionalSpinner loading={loading}>
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

export default GroupView;
