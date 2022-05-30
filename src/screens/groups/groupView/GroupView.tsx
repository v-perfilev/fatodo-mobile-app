import React, {useEffect, useMemo, useState} from 'react';
import {Divider, Theme} from 'native-base';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import GroupViewUsers from './GroupViewUsers';
import GroupViewItems from './groupViewItems/GroupViewItems';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FScrollView from '../../../components/boxes/FScrollView';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import UsersThunks from '../../../store/users/usersThunks';
import GroupSelectors from '../../../store/group/groupSelectors';
import GroupThunks from '../../../store/group/groupThunks';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import GroupViewHeader from './GroupViewHeader';

const GroupView = () => {
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'GroupView'>>();
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const groupLoading = useAppSelector(GroupSelectors.loading);
  const [loading, setLoading] = useDelayedState();
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const groupId = route.params.groupId;
  const colorScheme = route.params.colorScheme;

  const goToGroupList = (): void => navigation.navigate('GroupList');

  useEffect(() => {
    setLoading(true);
    dispatch(GroupThunks.fetchGroup(groupId))
      .unwrap()
      .catch(() => goToGroupList())
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (group) {
      const userIds = group.members.map((user) => user.id);
      dispatch(UsersThunks.handleUserIds(userIds));
      navigation.setParams({...route.params, color: group?.color});
    }
  }, [group]);

  const theme = useMemo<Theme>(() => {
    return group || colorScheme ? ThemeFactory.getTheme(group?.color || colorScheme) : ThemeFactory.getDefaultTheme();
  }, [group, colorScheme]);

  return (
    <ThemeProvider theme={theme}>
      <GroupViewHeader />
      <ConditionalSpinner loading={loading || groupLoading}>
        <FScrollView>
          <FVStack defaultSpace>
            <GroupViewUsers />
            <Divider bg="secondary.500" />
            <GroupViewItems showArchived={showArchived} setShowArchived={setShowArchived} />
          </FVStack>
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default GroupView;
