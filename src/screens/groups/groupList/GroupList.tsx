import React, {FC, useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import withGroupListItems from '../../../shared/hocs/withLists/withGroupListItems';
import withGroupList from '../../../shared/hocs/withLists/withGroupList';
import {useGroupListContext} from '../../../shared/contexts/listContexts/groupListContext';
import GroupListContainer from './GroupListContainer';
import {useGroupListItemsContext} from '../../../shared/contexts/listContexts/groupListItemsContext';
import ItemService from '../../../services/ItemService';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
import CentredSpinner from '../../../components/surfaces/CentredSpinner';
import Header from '../../../components/layouts/Header';
import CollapsedIcon from '../../../components/icons/CollapsedIcon';
import PlusIcon from '../../../components/icons/PlusIcon';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import ReorderIcon from '../../../components/icons/ReorderIcon';
import CheckIcon from '../../../components/icons/CheckIcon';
import CloseIcon from '../../../components/icons/CloseIcon';
import PressableButton from '../../../components/controls/PressableButton';
import {Box} from 'native-base';
import withUserList from '../../../shared/hocs/withLists/withUserList';

const GroupList: FC = () => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {handleCode, handleResponse} = useSnackContext();
  const {groups, load: loadGroups, loading: groupsLoading} = useGroupListContext();
  const {loadInitialState, allCollapsed, setAllCollapsed} = useGroupListItemsContext();
  const [sorting, setSorting] = useState<boolean>(false);

  const saveOrder = (): void => {
    const orderedGroupIds = groups.map((g) => g.id);
    ItemService.setGroupOrder(orderedGroupIds)
      .then(() => {
        handleCode('group.sorted', 'info');
      })
      .catch(({response}) => {
        handleResponse(response);
      });
  };

  const switchCollapsed = (): void => setAllCollapsed(!allCollapsed);

  const enableSorting = (): void => {
    setAllCollapsed(true);
    setTimeout(
      () => {
        setSorting(true);
      },
      allCollapsed ? 0 : 300,
    );
  };

  const saveSorting = (): void => {
    setAllCollapsed(false);
    setSorting(false);
    saveOrder();
  };

  const cancelSorting = (): void => {
    setAllCollapsed(false);
    setSorting(false);
  };

  const goToGroupCreate = (): void => {
    navigation.navigate('GroupCreate');
  };

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      const groupIds = groups.map((g) => g.id);
      loadInitialState(groupIds);
    }
  }, [groups.length]);

  return (
    <>
      <Header>
        {sorting ? (
          <>
            <PressableButton onPress={saveSorting}>
              <CheckIcon color="white" size="8" />
            </PressableButton>
            <PressableButton onPress={cancelSorting}>
              <CloseIcon color="white" size="8" />
            </PressableButton>
          </>
        ) : (
          <>
            <PressableButton onPress={goToGroupCreate}>
              <PlusIcon color="white" size="8" />
            </PressableButton>
            <PressableButton onPress={enableSorting}>
              <ReorderIcon color="white" size="6" />
            </PressableButton>
            <PressableButton onPress={switchCollapsed}>
              <CollapsedIcon visible={!allCollapsed} color="white" size="8" />
            </PressableButton>
          </>
        )}
      </Header>
      <Box flex="1">{groupsLoading ? <CentredSpinner /> : <GroupListContainer sorting={sorting} />}</Box>
    </>
  );
};

export default flowRight([withGroupList, withGroupListItems, withUserList])(GroupList);
