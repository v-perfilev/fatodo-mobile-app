import React, {memo} from 'react';
import Header from '../../../components/layouts/Header';
import PressableButton from '../../../components/controls/PressableButton';
import CheckIcon from '../../../components/icons/CheckIcon';
import CloseIcon from '../../../components/icons/CloseIcon';
import PlusIcon from '../../../components/icons/PlusIcon';
import ReorderIcon from '../../../components/icons/ReorderIcon';
import CollapsedIcon from '../../../components/icons/CollapsedIcon';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import ItemService from '../../../services/ItemService';
import {flowRight} from 'lodash';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import GroupsActions from '../../../store/groups/groupsActions';

type GroupListHeaderProps = {
  sorting: boolean;
  setSorting: (sorting: boolean) => void;
};

const GroupListHeader = ({sorting, setSorting}: GroupListHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const groups = useAppSelector(GroupsSelectors.groups);
  const allCollapsed = useAppSelector(GroupsSelectors.itemsAllCollapsed);

  const setAllCollapsed = (value: boolean): void => {
    dispatch(GroupsActions.setAllCollapsed(value));
  };

  const saveOrder = (): void => {
    const orderedGroupIds = groups.map((g) => g.id);
    ItemService.setGroupOrder(orderedGroupIds).then(() => {
      dispatch(SnackActions.handleCode('group.sorted', 'info'));
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

  return (
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
  );
};

export default flowRight([memo])(GroupListHeader);
